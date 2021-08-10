const express = require('express');
const router = express.Router();
const { create, list, search, likes, likeCheck, likeModify, postsByUser, file, fileCheck, UserById, PostById } = require('../controllers/post.controller.js')
//Exporta rutas

router.get('/list', list)
router.get('/file/:PostId', file)
router.get('/file/check/:PostId', fileCheck)
router.get('/postsbyuser/:UserId', postsByUser);
router.post('/create', create)
router.post('/search', search)
router.post('/likes', likes)
router.post('/like/check', likeCheck);
router.post('/like/modify', likeModify)

router.param('UserId', UserById);
router.param('PostId', PostById);
module.exports = router;