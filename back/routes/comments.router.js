const express = require('express');
const router = express.Router();
const controller = require("../controllers/comments.controller");
const auth = require("../middleware/auth.middleware");

router
    .get('/', auth, controller.getComments)
    .post('/', auth, controller.addComment)

module.exports = router;