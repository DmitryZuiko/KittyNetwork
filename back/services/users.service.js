const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const yup = require('../models/user-valid-schema');

class UsersService {

    getUsers = async() => {
        const users = await User.find({})
            const newUsers = users.map(item => {
            return {
                userId: item._id,
                avatar: item.avatar,
                login: item.login
            }
        })
        return newUsers
    }

    getAllFriendsById = async(id) => {
        try {
            const user = await User.findById(id);
            const friends = await User.find({
                _id: user.friends
            })
            return friends.map((friend) => ({
                id: friend._id,
                login: friend.login,
                avatar: friend.avatar
            }));
        } catch (e) {
            console.log(e);
        }
    }

    addFriend = async({userId, friendId}) => {
        try {
            const user = await User.findById(userId);
            if (user.friends.includes(friendId)) {
                return {
                    message: "You are already friends"
                }
            } else {
                await User.updateOne({_id: userId}, {$push: {friends: friendId}});
                return {
                    message: "friend added",
                    status: "ok"
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    getOneUser = (id) => {
        return User.findById(id);
    }

    updateUser = async(updateData, id) => {
        await User.updateOne({_id: id}, {...updateData});
    }

    updateAvatar = async({id, avatar}) => {
        try {
            await User.updateOne({_id: id}, {avatar});
            await Post.updateMany({userID: id}, {avatar});
            await Comment.updateMany({userID: id}, {avatar});
            return {
                message: "successfully"
            }
        } catch (e) {
            console.log(e);
        }
    }

    updateLogin = async({id, login}) => {
        try {
            await User.updateOne({_id: id}, {login});
            await Post.updateMany({userID: id}, {login});
            await Comment.updateMany({userID: id}, {login});
            return {
                message: "successfully"
            }
        } catch (e) {
            console.log(e);
        }
    }

    addUser = async(user) => {
        const isValid = await yup.isValid(user);
        if (isValid) {
            const candidate = await User.findOne({
                email: user.email
            })
            if (candidate) {
                return {
                    message: "this email is already registered"
                }
            } else {
                const hash = await bcrypt.hash(user.password, 10)
                const newUser = new User ({
                    login: user.login,
                    email: user.email,
                    password: hash,
                })
                await newUser.save();
                return {
                    message: "user created"
                }
            }
        } else {
            return {
                message: "invalid data"
            }
        }
    }

    deleteUser = async(id) => {
        const user = User.findById(id);
        await user.deleteOne();
    }

    login = async(email, password) => {
        const user = await User.findOne({email: email});
        if (user) {
            const check = await bcrypt.compare(password, user.password);
            if (check) {
                const token =  await jwt.sign({email}, 'secretKey');
                return {
                    token: token,
                    id: user._id,
                    login: user.login,
                    avatar: user.avatar
                }
            } else {
                return {
                    message: "wrong password"
                }
            }
        } else {
            return {
                message: "User not found"
            }
        }
    }
}

module.exports = new UsersService();