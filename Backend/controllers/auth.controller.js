const User = require("../models/auth.model");
const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const { UserById } = require("./post.controller");
const fs = require("fs");

// exports.create = (req, res) => {
//   let form1 = new formidable.IncomingForm()
//   form1.keepExtensions = true
//   form1.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Image could not be uploaded"
//       })
//     }
//     const user = new User(fields);
//     if (files.photo) {
//       if (files.photo.size > 1000000) {
//         return res.status(400).json({
//           error: "Image should be lass than 1MB in size"
//         })
//       }
//       const types = ["image/jpeg","image/png","image/svg+xml"]
//       if (types.indexOf(files.photo.type) == -1 ) {
//         return res.status(400).json({
//           error: files.photo.type
//         })
//       }
//       user.photo.contentType = files.photo.type
//       user.photo.data = fs.readFileSync(files.photo.path)
//     }
//     user.save((err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       }
//       return res.json(result);
//     });
//   })
// };

exports.create = (req, res) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    const { names, surnames, email } = result;
    return res.json({ names: names, surnames: surnames, email: email });
  });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";

  User.find()
    .select("-hashed_password")
    .select("-salt")
    .sort([[sortBy, order]])
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "Usuarios no encontrados",
        });
      }
      res.json(users);
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "Este email no está registrado",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, names, surnames, email, status, followers, following } = user;
    return res.json({
      token,
      user: { _id, names, surnames, email, status, followers, following },
      domain: "EPCC",
    });
  });
};

exports.modify = (req, res) => {
  const { names, surnames, email, password, newpassword, status } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "Este email no está registrado",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Contraseña incorrecta",
      });
    }

    user.names = names;
    user.surnames = surnames;
    user.password = newpassword;
    user.status = status;
    user.save();

    return res.status(200).json({
      message: "Ok",
    });
  });
};

exports.data = (req, res) => {
  const { names, surnames, email, status, followers, following } = req.User;
  return res.json({
    names,
    surnames,
    email,
    status,
    followers,
    following,
  });
};

exports.followCheck = (req, res) => {
  const { id, Userid } = req.body;
  User.findById(Userid).exec((err, U2) => {
    if (err || !U2) {
      return res.status(400).json({
        error: "El usuario no fue encontrado o no existe",
      });
    }
    return res.json(U2.followers.includes(id));
  });
};

exports.followModify = (req, res) => {
  const { id, Userid } = req.body;
  User.findById(Userid).exec((err, U2) => {
    if (err || !U2) {
      return res.status(400).json({
        message: `El usuario no fue encontrado o no existe`,
      });
    }
    User.findById(id).exec((err, U1) => {
      if (err || !U1) {
        return res.status(400).json({
          message: `El usuario no fue encontrado o no existe`,
        });
      }
      if (U2.followers.includes(id)) {
        U2.followers.splice(U2.followers.indexOf(id), 1);
        U1.following.splice(U1.following.indexOf((Userid),1));
      } else {
        U2.followers.push(id);
        U1.following.push(Userid);
      }
      U2.save();
      U1.save();
      return res.json(U2.followers.includes(id));
    });
  });
};

exports.photo = (req, res, next) => {
  if (req.User.photo.data) {
    res.set("Content-Type", req.User.photo.contentType);
    return res.send(req.User.photo.data);
  }
  next();
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
