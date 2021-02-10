const Post = require("../models/post");

class UserService {

    getPosts = async() => {
        try {
            return await Post.find({});
        } catch (e) {
            console.log(e);
        }
    }

    addPost = async(body) => {
        const post = new Post({
            userID: body.userID,
            login: body.login,
            avatar: body.avatar,
            text: body.text,
            image: body.image,
        })
        await post.save();
        return {
            message: "post created"
        }
    }

    updateLikes = async({postId, userId}) => {
        try {
            const post = await Post.findById(postId);
            const isLike = post.likes.find(id => id == userId)
            if (isLike) {
                await Post.updateOne({_id: postId}, {likes: post.likes.filter(id => id != userId)})

            } else {
                await Post.updateOne({_id: postId}, {likes: [...post.likes, userId]})
            }
            return {
                message: "successfully"
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UserService();