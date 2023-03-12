import UserService from "../services/UserService.js";

class UserController {

    async getAll(req, res) {
        try {
            const users = await UserService.getAll();
            return res.status(201).json(users);
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async getOne(req,res) {
        try {
            const id = req.params.id;
            const user = await UserService.getOne(id);
            return res.status(201).json(user);
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async create(req, res) {
        try {
            const user = UserService.create(req.body);
            return res.status(201).json(user);
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

}

export default new UserController();