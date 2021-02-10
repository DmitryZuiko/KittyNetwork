const commentService = require("../services/comments.service");

class CommentsController {
    service = commentService;

    getComments = async(req, res) => {
        res.send(await this.service.getComments());
    }

    addComment = async(req, res) => {
        res.send(await this.service.addComment(req.body));
    }
}

module.exports = new CommentsController();