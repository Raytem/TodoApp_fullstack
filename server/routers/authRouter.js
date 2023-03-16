import { Router } from "express";
import UserController from "../controllers/UserController.js";

const authRouter = new Router();

authRouter.post('/registration', UserController.registration);
authRouter.post('/login', UserController.login);
authRouter.post('/logout', UserController.logout);
authRouter.get('/activate/:link', UserController.activate);
authRouter.get('/refreshToken', UserController.refreshToken);

export default authRouter;