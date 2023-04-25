import TodoModel from "../models/TodoModel.js";
import UserModel from "../models/UserModel.js";
import UserDTO from "../DTOs/UserDTO.js";
import getProcessedQuery from "../utils/getProcessedQuery.js";
import ApiError from "../exceptions/ApiError.js";
import UserService from '../services/UserService.js'

class TodoService {

    async getAll(queryParams) {
        const {filter, skip, limit, sort} = getProcessedQuery(queryParams);

        const todos = await TodoModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort);

        return todos;
    }

    async getOne(id) {
        if (!id) {
            throw ApiError.BadRequestError('Id is not defined');
        }
        const todo = await TodoModel.findById(id);
        return todo;
    }

    async getUsersByTodoId(id, queryParams) {
        const todo = await TodoModel.findById(id);
        const {filter, skip, limit, sort} = getProcessedQuery(queryParams);

        if (!todo) {
            throw ApiError.BadRequestError('Request body is not defined');
        }

        const users = await UserModel.find({$and: [{ todoList: { $in: [id] } }, filter]})
            .skip(skip)
            .limit(limit)
            .sort(sort);
        const usersDTOs = users.map(user => new UserDTO(user));

        return usersDTOs;
    }
    
    async create(todo, userId) {
        const user = await UserModel.findById(userId);
        const newTodo = await TodoModel.create(todo);

        if (!todo) {
            throw ApiError.BadRequestError('Request body is not defined');
        }
        if (!user) {
            throw ApiError.BadRequestError('User is not defined');
        }

        newTodo.userList.push(userId);
        user.todoList.push(newTodo._id);
        newTodo.creator = user.nickName;
        await newTodo.save();
        await user.save();

        return newTodo;
    }

    async addTodoByUserId(todoId, userId) {
        const todo = await TodoModel.findById(todoId);
        const user = await UserModel.findById(userId);

        if (!todo) {
            throw ApiError.BadRequestError('Todo is not defined');
        }
        if (!user) {
            throw ApiError.BadRequestError('User is not defined');
        }

        if (!todo.userList.includes(user._id)) todo.userList.push(userId);
        if (!user.todoList.includes(todo._id))user.todoList.push(todo._id);
        await todo.save();
        await user.save();

        return todo;
    }

    async delTodoByUserId(todoId, userId) {
        const todo = await TodoModel.findById(todoId);
        const user = await UserModel.findById(userId);

        if (!todo) {
            throw ApiError.BadRequestError('Todo is not defined');
        }
        if (!user) {
            throw ApiError.BadRequestError('User is not defined');
        }

        if (todo.userList.includes(userId)) {
            const userIdIndex = todo.userList.indexOf(userId);
            todo.userList.splice(userIdIndex, 1);
        }
        if (user.todoList.includes(todoId)) {
            const todoIdIndex = user.todoList.indexOf(todoId)
            user.todoList.splice(todoIdIndex, 1);
        }

        await todo.save();
        await user.save();

        return todo;
    }

    async update(id, changedTodo) {
        if(!id || !changedTodo) {
            throw ApiError.BadRequestError('Request body or id is not defined');
        }
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            {...changedTodo}
        )
        .then((data) => data)
        .catch((err) => {console.log(err); return err});

        return await TodoModel.findById(updatedTodo.id);
    }

    async partialUpdate(id, objWithUpdatedFields) {
        if(!id || !objWithUpdatedFields) {
            throw ApiError.BadRequestError('Request body or id is not defined');
        }
        const todo = await TodoModel.findByIdAndUpdate(
            id, 
            {$set: {...objWithUpdatedFields}}
        )
        .then((data) => data)
        .catch((err) => {console.log(err); return err});

        return await TodoModel.findById(todo.id);
    }

    async delete(todoId, userIdThatRemove) {
        
        if (!todoId) {
            throw ApiError.BadRequestError('Todo Id is not defined');
        }
        if (!userIdThatRemove) {
            throw ApiError.BadRequestError('User Id is not defined');
        }

        const todo = await TodoModel.findById(todoId);
        const userThatRemove = await UserModel.findById(userIdThatRemove);
        
        // if the user is the creator
        if (todo.userList.indexOf(userIdThatRemove) === 0) {
            todo.userList.forEach(async userId => {
                await TodoModel.findByIdAndDelete(todoId);

                const user = await UserModel.findById(userId);
                const indexOfTodoId = user.todoList.indexOf(todo._id);
                user.todoList.splice(indexOfTodoId, 1);
                await user.save();
            })
        } else {
            const indexOfTodoId = userThatRemove.todoList.indexOf(todo._id);
            userThatRemove.todoList.splice(indexOfTodoId, 1);

            const indexOfUserId = todo.userList.indexOf(userIdThatRemove);
            todo.userList.splice(indexOfUserId, 1);

            await userThatRemove.save();
            await todo.save();
        }

        return todo;
    }

}

export default new TodoService();