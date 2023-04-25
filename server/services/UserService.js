import UserModel from "../models/UserModel.js";
import UserDTO from "../DTOs/UserDTO.js"
import bcrypt from "bcryptjs";
import TodoModel from "../models/TodoModel.js";
import getProcessedQuery from "../utils/getProcessedQuery.js";
import MailService from "./MailService.js";
import { v4 as uuidv4 } from 'uuid';
import TokenService from "./TokenService.js";
import ApiError from "../exceptions/ApiError.js";

class UserService {

    async getAll(queryParams) {
        const {filter, skip, limit, sort} = getProcessedQuery(queryParams);
        const users = await UserModel.find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort);
        
        const usersDTOs = users.map(user => new UserDTO(user));
            
        return usersDTOs;
    }

    async getOne(id) {
        if (!id) {
            throw ApiError.BadRequestError('id is not defined');
        }
        const user = await UserModel.findById(id);

        return new UserDTO(user);
    }

    async getTodosByUserId(id, queryParams) {
        const {filter, skip, limit, sort} = getProcessedQuery(queryParams);
        const user = await UserModel.findById(id);

        if (!user) {
            throw ApiError.BadRequestError('User is not defined');
        }

        const todos = await TodoModel.find({ $and: [ { userList: { $in: [id] } }, filter ] })
            .skip(skip)
            .limit(limit)
            .sort(sort);

        return todos;
    }

    async delete(id) {
        const user = await UserModel.findById(id);
        if (!user) {
            throw ApiError.BadRequestError('User is not defined');
        }

        user.todoList.forEach(async todoId => {
            const todo = await TodoModel.findById(todoId);
            const indexOfUserId = todo.userList.indexOf(id);

            //if the user is the creator
            if (indexOfUserId === 0) {
                await TodoModel.findByIdAndDelete(todo._id);
            } else {
                todo.userList.splice(indexOfUserId, 1);
                await todo.save();
            }
        })

        await UserModel.findByIdAndDelete(id);

        return new UserDTO(user);
    }

    async registration(user) {
        const candidate = await UserModel.findOne({$or: [{email: user.email}, {nickName: user.nickName}]})
        if (candidate) {
            throw ApiError.BadRequestError(`User with ${user.email} email or nickName has already been registered`);
        }
        const hashPassword = await bcrypt.hash(user.password, 3);
        const activationLink = uuidv4();

        // await MailService.sendActivationMail(user.email, `${process.env.SERVER_URL}/auth/activate/${activationLink}`);
        const newUser = await UserModel.create({...user, password: hashPassword, activationLink});

        const userDto = new UserDTO(newUser);
        const tokens = TokenService.generateTokens(({...userDto}));
        await TokenService.saveToken(newUser._id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.UnauthorizedError();
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.UnauthorizedError();
        }

        const userDto = new UserDTO(user);
        const tokens = TokenService.generateTokens(({...userDto}));
        await TokenService.saveToken(user._id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData._id);
        const userDto = new UserDTO(user);
        const tokens = TokenService.generateTokens(({...userDto}));

        await TokenService.saveToken(user._id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }   

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequestError('User is not defined');
        }
        user.isActivated = true;
        await user.save()
    }

}

export default new UserService();