import UserService from "../services/UserService.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError.js";

class UserController {

    async getAll(req, res, next) {
        try {
            const users = await UserService.getAll(req.query);
            return res.status(200).json(users);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;
            const user = await UserService.getOne(id);
            return res.status(200).json(user);
        } catch(e) {
            next(e);
        }
    }

    async getTodosByUserId(req, res, next) {
        try {
            const todos = await UserService.getTodosByUserId(req.params.id, req.query);
            return res.status(200).json(todos);
        } catch(e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const user = await UserService.delete(req.params.id);
            return res.status(202).json(user);
        } catch(e) {
            next(e);
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequestError('Validation error', errors.array()));
            }
            const userData = await UserService.registration(req.body);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(201).json(userData);
        } catch(e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(202).json(userData);
        } catch(e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            return res.status(202).json(token);
        } catch(e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(`${process.env.CLIENT_URL}/emailVerified`);
        } catch(e) {
            next(e);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refreshToken(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(202).json(userData);
        } catch(e) {
            next(e);
        }
    }


}

export default new UserController();