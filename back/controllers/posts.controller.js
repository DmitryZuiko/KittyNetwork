const postService = require("../services/posts.service");

class PostsController {
    service = postService;

    getPosts = async(req, res) => {
        res.send(await this.service.getPosts());
    }

    addPost = async(req, res) => {
        res.send(await this.service.addPost(req.body));
    }

    updateLikes = async(req, res) => {
        res.send(await this.service.updateLikes(req.body));
    }
}

module.exports = new PostsController();