import TodoService from "../services/todoService.js";

class TodoController {
    
    async getAll(req, res) {
        try {
            const query = req.query;

            if (Object.keys(query).length != 0) {
                let sortedTodos = [];
                
                if ('sort' in query) {
                    const sortParams = query.sort.split(',');

                    if (sortParams.includes('isCompleted')) {
                        sortedTodos = await TodoService.getCompleted();
                    } 

                    else if (sortParams.includes('!isCompleted')) {
                        sortedTodos = await TodoService.getNotCompleted();
                    }

                    else {
                        sortedTodos = await TodoService.getAll();
                    }

                    sortParams.forEach((param) => {
                        sortedTodos = sortedTodos.sort((a, b) => {
                            if (typeof(a[param]) === 'string') {
                                return a[param].localeCompare(b[param]);
                            } else {
                                return b[param] - a[param];
                            }
                        })
                    })
                }
                return res.status(201).json(sortedTodos);
            } else {
                const todos = await TodoService.getAll();
                return res.status(201).json(todos);
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const todo = await TodoService.getOne(req.params.id);
            return res.status(201).json(todo);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async create(req, res) {
        try {
            const todo = await TodoService.create(req.body);
            return res.status(201).json(todo);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedTodo = await TodoService.update(req.params.id, req.body);
            return res.status(201).json(updatedTodo);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async partialUpdate(req, res) {
        try {
            const updatedTodo = await TodoService.partialUpdate(req.params.id, req.body);
            return res.status(201).json(updatedTodo);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const todo = await TodoService.delete(req.params.id);
            return res.status(201).json(todo);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

}

export default new TodoController();