import TodoController from "../controllers/TodoController.js";
import Router from "express";

const todoRouter = new Router();

todoRouter.get('/', TodoController.getAll);
todoRouter.get('/:id', TodoController.getOne);
todoRouter.post('/', TodoController.create);
todoRouter.put('/:id', TodoController.update);
todoRouter.delete('/:id', TodoController.delete);

export default todoRouter;