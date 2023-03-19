import TodoService from "../services/todoService.js";
import getProcessedQuery from "../utils/getProcessedQuery.js";

class TodoController {
    
    async getAll(req, res) {
        try {
            const processedQuery = getProcessedQuery(req.query);
            const todos = await TodoService.getAll(processedQuery);
            return res.status(200).json(todos);
        } catch (e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const todo = await TodoService.getOne(req.params.id);
            return res.status(201).json(todo);
        } catch (e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async getUsersByTodoId(req, res) {
        try {
            const todo = await TodoService.getUsersByTodoId(req.params.id);
            return res.status(201).json(todo);
        } catch (e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async create(req, res) {
        try {
            const todo = await TodoService.create(req.body, req.params.userId);
            return res.status(201).json(todo);
        } catch (e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async addTodoByUserId(req, res) {
        try {
            const todo = await TodoService.addTodoByUserId(req.params.todoId, req.params.userId);
            return res.status(201).json(todo);
        } catch (e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedTodo = await TodoService.update(req.params.id, req.body);
            return res.status(201).json(updatedTodo);
        } catch (e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async partialUpdate(req, res) {
        try {
            const updatedTodo = await TodoService.partialUpdate(req.params.id, req.body);
            return res.status(201).json(updatedTodo);
        } catch (e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const todo = await TodoService.delete(req.params.todoId, req.params.userId);
            return res.status(201).json(todo);
        } catch (e) {
            console.error(e)
            return res.status(500).json(e);
        }
    }

}

export default new TodoController();