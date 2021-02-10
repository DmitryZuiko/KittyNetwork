const express = require('express');
const router = express.Router();
const controller = require("../controllers/posts.controller")
const auth = require("../middleware/auth.middleware");

router
    .get('/', auth, controller.getPosts)
    .post('/', auth, controller.addPost)
    .put('/likes', auth, controller.updateLikes)

module.exports = router;