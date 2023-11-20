import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { body } from "express-validator";

const authRouter = new Router();

authRouter.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    UserController.registration
);
authRouter.post('/login', UserController.login);
authRouter.post('/logout', UserController.logout);
authRouter.get('/activate/:link', UserController.activate);
authRouter.get('/refreshToken', UserController.refreshToken);

export default authRouter;