import TodoModel from "../models/TodoModel.js";

class TodoService {

    async getAll() {
        const todos = await TodoModel.find();
        return todos;
    }

    async getFiltered(filterObj) {
        const todos = await TodoModel.find(filterObj);
        return todos;
    }

    async getSorted(sortObj) {
        const todos = await TodoModel.find().sort(sortObj);
        return todos;
    }

    async getFilteredAndSorted(filterObj, sortObj) {
        const todos = await TodoModel.find(filterObj).sort(sortObj);
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
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            {...changedTodo, lastModified: (Date.now() + 10800000)}
        )
        .then((data) => data)
        .catch((err) => {console.log(err); return err});

        return updatedTodo;
    }

    async partialUpdate(id, objWithUpdatedFields) {
        if(!id || !objWithUpdatedFields) {
            throw new Error('Request body or id is not defined');
        }
        const todo = await TodoModel.findByIdAndUpdate(
            id, 
            {$set: {...objWithUpdatedFields, lastModified: (Date.now() + 10800000)}}
        )
        .then((data) => data)
        .catch((err) => {console.log(err); return err});

        return todo;
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