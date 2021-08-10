const express = require('express');
const router = express.Router();
const { create, list, signin, followCheck, modify,  followModify,data, photo, UserById } = require('../controllers/auth.controller.js')
//Exporta rutas

router.get('/list', list)
router.get('/data/:UserId', data);
router.get('/photo/:UserId', photo)
router.post('/signup', create)
router.post('/signin', signin)
router.post('/modify', modify)
router.post('/follow/check', followCheck);
router.post('/follow/modify', followModify)

router.param('UserId', UserById);
module.exports = router;