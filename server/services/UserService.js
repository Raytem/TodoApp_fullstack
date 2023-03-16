import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

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

    async registration(user) {
        const candidate = await UserModel.findOne({email: user.email})
        if (candidate) {
            throw new Error('User with this email is already registered');
        }
        const hashPassword = bcrypt.hash(user.password, 3);
        const newUser = await UserModel.create({...user, password: hashPassword});

        return newUser;
    }

    async login(user) {

    }

    async logout(user) {

    }

}

export default new UserService();