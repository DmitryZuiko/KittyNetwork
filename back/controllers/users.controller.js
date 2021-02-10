const usersService = require("../services/users.service");

class UsersController {
    service = usersService;

    get = async(req, res, next) => {
        res
            .status(200)
            .send(await this.service.getUsers())
    }

    getAllFriendsById = async(req, res, next) => {
        res
            .status(200)
            .send(await this.service.getAllFriendsById(req.params.id))
    }

    addFriend = async(req, res, next) => {
        res
            .status(200)
            .send(await this.service.addFriend(req.body))
    }

    getOne = async(req, res, next) => {
        res
            .status(200)
            .send(await this.service.getOneUser(req.params.id))
    }

    update = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.updateUser(req.body, req.params.id))
    }

    updateAvatar = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.updateAvatar(req.body))
    }

    updateLogin = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.updateLogin(req.body))
    }

    add = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.addUser(req.body))
    }

    delete = async(req, res, next) => {
        res
            .status(201)
            .send(await this.service.deleteUser(req.params.id))
    }

    login = async(req, res) => {
        res.send(await this.service.login(req.body.email, req.body.password))
    }
}

module.exports = new UsersController();