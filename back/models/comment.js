const { Schema, model, Types } = require('mongoose');

const schema = new Schema ({
    userID: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postID: {
        type: Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    login: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
})

module.exports = model('Comment', schema);