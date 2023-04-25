import TodoService from "../services/todoService.js";

class TodoController {
    
    async getAll(req, res, next) {
        try {
            const todos = await TodoService.getAll(req.query);
            return res.status(200).json(todos);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const todo = await TodoService.getOne(req.params.id);
            return res.status(200).json(todo);
        } catch (e) {
            next(e);
        }
    }

    async getUsersByTodoId(req, res, next) {
        try {
            const todo = await TodoService.getUsersByTodoId(req.params.id, req.query);
            return res.status(200).json(todo);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const todo = await TodoService.create(req.body, req.params.userId);
            return res.status(201).json(todo);
        } catch (e) {
            next(e);
        }
    }

    async addTodoByUserId(req, res, next) {
        try {
            const todo = await TodoService.addTodoByUserId(req.params.todoId, req.params.userId);
            return res.status(202).json(todo);
        } catch (e) {
            next(e);
        }
    }

    async delTodoByUserId(req, res, next) {
        try {
            const todo = await TodoService.delTodoByUserId(req.params.todoId, req.params.userId);
            return res.status(202).json(todo);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const updatedTodo = await TodoService.update(req.params.id, req.body);
            return res.status(202).json(updatedTodo);
        } catch (e) {
            next(e);
        }
    }

    async partialUpdate(req, res, next) {
        try {
            const updatedTodo = await TodoService.partialUpdate(req.params.id, req.body);
            return res.status(202).json(updatedTodo);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const todo = await TodoService.delete(req.params.todoId, req.params.userId);
            return res.status(202).json(todo);
        } catch (e) {
            next(e);
        }
    }

}

export default new TodoController();