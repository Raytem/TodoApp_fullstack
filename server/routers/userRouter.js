import Router from "express";
import UserController from "../controllers/UserController.js";

const userRouter = new Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getOne);
userRouter.get('/:id/todos', UserController.getTodosByUserId);
userRouter.delete('/:id', UserController.delete);

export default userRouter;