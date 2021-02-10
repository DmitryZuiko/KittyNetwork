const { Schema, model, Types } = require('mongoose');

const schema = new Schema ({
    userID: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    login: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://yt3.ggpht.com/a/AATXAJxiBZi5__QDAw45FPANj5YHwvijjMcy5qxN=s900-c-k-c0xffffffff-no-rj-mo",
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://mixnews.lv/wp-content/uploads/2020/09/18/2020-09-18-mixnews-1594705838_krasota-prirody-na-fotografiyax-14.jpg",
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = model('Post', schema);