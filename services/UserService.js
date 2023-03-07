import UserModel from "../models/UserModel.js";

class UserService {

    async getAll() {
        const users = await UserModel.find();
        return users;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id is not defined');
        }
        const user = await UserModel.findById(id);
        return user;
    }

    async create(user) {
        if (!user) {
            throw new Error('Request body is not defined');
        }
        const newUser = await UserModel.create(user);
        return newUser;
    }

}

export default new UserService();