import TodoController from "../controllers/TodoController.js";
import Router from "express";

const todoRouter = new Router();

todoRouter.get('/', TodoController.getAll);
todoRouter.get('/:id', TodoController.getOne);
todoRouter.get('/:id/users', TodoController.getUsersByTodoId);
todoRouter.post('/:userId', TodoController.create);
todoRouter.put('/:id', TodoController.update);
todoRouter.patch('/:id', TodoController.partialUpdate);
todoRouter.delete('/:todoId/:userId', TodoController.delete);

todoRouter.patch('/:todoId/:userId', TodoController.addTodoByUserId)
todoRouter.put('/:todoId/:userId', TodoController.delTodoByUserId)


export default todoRouter;