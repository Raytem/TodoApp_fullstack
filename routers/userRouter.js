import Router from "express";
import UserController from "../controllers/UserController.js";

const userRouter = new Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getOne);
userRouter.post('/', UserController.create);

export default userRouter;