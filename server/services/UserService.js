import UserModel from "../models/UserModel.js";
import UserDTO from "../DTOs/UserDTO.js"
import bcrypt from "bcryptjs";
import TodoModel from "../models/TodoModel.js";
import { mongoose } from "mongoose";

class UserService {

    async getAll() {
        const users = await UserModel.find();
        return users;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('User is not defined');
        }
        const user = await UserModel.findById(id);
        return user;
    }

    async getTodosByUserId(id) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error('User is not defined');
        }

        return await TodoModel.find({userList: { $in: [id] } });
    }

    async delete(id) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw new Error('User is not defined');
        }

        user.todoList.forEach(async todoId => {
            const todo = await TodoModel.findById(todoId);
            const indexOfUserId = todo.userList.indexOf(id);

            //if the user is the creator
            if (indexOfUserId === 0) {
                await TodoModel.findByIdAndDelete(todo._id);
            } else {
                todo.userList.splice(indexOfUserId, 1);
                todo.save();
            }
        })

        await UserModel.findByIdAndDelete(id);

        return new UserDTO(user);
    }

    async registration(user) {
        const candidate = await UserModel.findOne({$or: [{email: user.email}, {nickName: user.nickName}]})
        if (candidate) {
            throw new Error('User with this email or nickName is already registered');
        }
        const hashPassword = await bcrypt.hash(user.password, 3);
        const newUser = await UserModel.create({...user, password: hashPassword});

        return new UserDTO(newUser);
    }

    async login(user) {

    }

    async logout(user) {

    }

}

export default new UserService();