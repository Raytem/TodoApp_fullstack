import TodoService from "../services/todoService.js";

class TodoController {
    
    async getAll(req, res) {
        try {
            const todos = await TodoService.getAll();
            return res.status(201).json(todos);
        } catch (e) {
            return res.status(500).json({e});
        }
    }

    async getOne(req, res) {
        try {
            const todo = await TodoService.getOne(req.params.id);
            return res.status(201).json(todo);
        } catch (e) {
            return res.status(500).json({e});
        }
    }

    async create(req, res) {
        try {
            const todo = await TodoService.create(req.body);
            return res.status(201).json(todo);
        } catch (e) {
            return res.status(500).json({e});
        }
    }

    async update(req, res) {
        try {
            const updatedTodo = await TodoService.update(req.params.id, req.body);
            return res.status(201).json(updatedTodo);
        } catch (e) {
            console.log(e)
            return res.status(500).json({e});
        }
    }

    async delete(req, res) {
        try {
            const todo = await TodoService.delete(req.params.id);
            return res.status(201).json(todo);
        } catch (e) {
            return res.status(500).json({e});
        }
    }

}

export default new TodoController();