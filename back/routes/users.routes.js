const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller')
const auth = require('../middleware/auth.middleware')

router
    .get('/', auth, controller.get)
    .get('/friends/:id', auth, controller.getAllFriendsById)
    .get('/:id', controller.getOne)
    .post('/auth', controller.add)
    .post('/login', controller.login)
    .post('/friends', auth, controller.addFriend)
    .put('/avatar', auth, controller.updateAvatar)
    .put('/username', auth, controller.updateLogin)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)

module.exports = router;