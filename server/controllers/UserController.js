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

    async getOne(req, res) {
        try {
            const id = req.params.id;
            const user = await UserService.getOne(id);
            return res.status(201).json(user);
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async getTodosByUserId(req, res) {
        try {
            const todos = await UserService.getTodosByUserId(req.params.id);
            return res.status(201).json(todos);
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const user = await UserService.delete(req.params.id);
            return res.status(201).json(user);
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async registration(req, res) {
        try {
            const user = await UserService.registration(req.body);
            return res.status(201).json(user);
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async login(req, res) {
        try {
            
            return res.status(201).json();
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async logout(req, res) {
        try {
            
            return res.status(201).json();
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async activate(req, res) {
        try {
            
            return res.status(201).json();
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async refreshToken(req, res) {
        try {
            
            return res.status(201).json();
        } catch(e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }


}

export default new UserController();