const Comment = require('../models/comment');

class CommentsService {

    getComments = async() => {
        try {
            return await Comment.find({});
        } catch (e) {
            console.log(e);
        }
    }

    addComment = async(body) => {
        try {
            const comment = new Comment({
                userID: body.userID,
                postID: body.postID,
                login: body.login,
                avatar: body.avatar,
                text: body.text,
            })
            await comment.save();
            return {
                message: "comment created"
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new CommentsService();