const User = require("../models/auth.model");
const Post = require("../models/post.model");
const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Ocurrió un error al crear la publicación",
      });
    }
    const post = new Post(fields);
    if (files.file) {
      if (files.file.size > 1000000) {
        return res.status(400).json({
          error: "Solo permitimos 1MB como máximo por archivo :c",
        });
      }
      post.file.data = fs.readFileSync(files.file.path);
      post.file.contentType = files.file.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(result);
    });
  });
};

// exports.create = (req, res) => {
//   const post = new Post(req.body);
//   post.save((err, result) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.json({ message: "Publicación realizada con éxito" });
//   });
// };

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "created";

  Post.find()
    .populate("author")
    .sort([[sortBy, order]])
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "Posts no encontrados",
        });
      }
      res.json(users);
    });
};

exports.search = (req, res) => {
  const tag = req.body[0];

  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "created";

  Post.find({ title: { $regex: tag } })
    .populate("author")
    .sort([[sortBy, order]])
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "Posts no encontrados",
        });
      }
      res.json(users);
    });
};

exports.postsByUser = (req, res) => {
  const { _id } = req.User;
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";

  Post.find({ author: _id })
    .populate("author")
    .sort([[sortBy, order]])
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "Posts no encontrados",
        });
      }
      res.json(posts);
    });
};

exports.fileCheck = (req, res) => {
  if (req.Post.file.data) {
    return res.send({ success: true });
  } else {
    return res.send({ success: false });
  }
};

exports.file = (req, res, next) => {
  if (req.Post.file.data) {
    res.set("Content-Type", req.Post.file.contentType);
    return res.send(req.Post.file.data);
  }
  next();
};

exports.likeCheck = (req, res) => {
  const { id, Postid } = req.body;
  Post.findById(Postid).exec((err, P) => {
    if (err || !P) {
      return res.status(400).json({
        error: "El post no fue encontrado o no existe",
      });
    }
    return res.json(P.likes.includes(id));
  });
};

exports.likeModify = (req, res) => {
  const { id, Postid } = req.body;
  Post.findById(Postid).exec((err, P) => {
    if (err || !P) {
      return res.status(400).json({
        message: `El post no fue encontrado o no existe`,
      });
    }
    if (P.likes.includes(id)) {
      P.likes.splice(P.likes.indexOf(id), 1);
    } else {
      P.likes.push(id);
    }
    P.save();
    return res.json(P.likes.includes(id));
  });
};

exports.likes = (req, res) => {
  const { Postid } = req.body;
  Post.findById(Postid).exec((err, P) => {
    if (err || !P) {
      return res.status(400).json({
        message: `El post no fue encontrado o no existe`,
      });
    }
    return res.json(P.likes);
  });
};

exports.PostById = (req, res, next, id) => {
  Post.findById(id).exec((err, Post) => {
    if (err || !Post) {
      return res.status(400).json({
        error: "El post no fue encontrado o no existe",
      });
    }
    req.Post = Post;
    next();
  });
};

exports.UserById = (req, res, next, id) => {
  User.findById(id).exec((err, User) => {
    if (err || !User) {
      return res.status(400).json({
        error: "El usuario no fue encontrado o no existe",
      });
    }
    req.User = User;
    next();
  });
};
