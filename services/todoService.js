import TodoModel from "../Schemas/TodoSchema.js";

class TodoService {

    async getAll() {
        const todos = await TodoModel.find();
        return todos;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id is not defined');
        }
        const todo = await TodoModel.findById(id);
        return todo;
    }
    
    async create(todo) {
        if(!todo) {
            throw new Error('Request body is not defined');
        }
        const newTodo = await TodoModel.create(todo);
        return newTodo;
    }

    async update(id, changedTodo) {
        if(!id || !changedTodo) {
            throw new Error('Request body or id is not defined');
        }
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, changedTodo);
        return updatedTodo;
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id is not defined');
        }
        const todo = await TodoModel.findByIdAndDelete(id);
        return todo;
    }

}

export default new TodoService();