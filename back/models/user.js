const { Schema, model, Types } = require('mongoose');

const schema = new Schema ({
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://yt3.ggpht.com/a/AATXAJxiBZi5__QDAw45FPANj5YHwvijjMcy5qxN=s900-c-k-c0xffffffff-no-rj-mo",
    },
    friends: [{
        type: Types.ObjectId,
        required: true,
        ref: "User"
    }]
})

module.exports = model('User', schema);