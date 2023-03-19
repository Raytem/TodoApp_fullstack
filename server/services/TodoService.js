import TodoModel from "../models/TodoModel.js";
import UserModel from "../models/UserModel.js";
import { mongoose } from "mongoose";
import UserDTO from "../DTOs/UserDTO.js";

class TodoService {

    async getAll({skip, limit, filter, sort}) {
        const todos = await TodoModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort);
        return todos;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id is not defined');
        }
        const todo = await TodoModel.findById(id);
        return todo;
    }

    async getUsersByTodoId(id) {
        const todo = await TodoModel.findById(id);

        if (!todo) {
            throw new Error('Request body is not defined');
        }

        const users = await UserModel.find({todoList: { $in: [id] } })
        const usersDTOs = users.map(user => new UserDTO(user));

        return usersDTOs;
    }
    
    async create(todo, userId) {
        if (!todo) {
            throw new Error('Request body is not defined');
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User is not defined');
        }

        const newTodo = await TodoModel.create(todo);

        newTodo.userList.push(userId);
        user.todoList.push(newTodo._id);
        await newTodo.save();
        await user.save();

        return newTodo;
    }

    async addTodoByUserId(todoId, userId) {
        const todo = await TodoModel.findById(todoId);
        const user = await UserModel.findById(userId);

        if (!todo) {
            throw new Error('Todo is not defined');
        }
        if (!user) {
            throw new Error('User is not defined');
        }

        todo.userList.push(userId);
        user.todoList.push(todo._id);
        await todo.save();
        await user.save();

        return todo;
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

    async delete(todoId, userIdThatRemove) {
        const todo = await TodoModel.findById(todoId);
        const userThatRemove = await UserModel.findById(userIdThatRemove);

        if (!todoId) {
            throw new Error('Id is not defined');
        }
        if (!userThatRemove) {
            throw new Error('User is not defined');
        }
        
        //if the user is the creator
        if (todo.userList.indexOf(userIdThatRemove) === 0) {
            todo.userList.forEach(async userId => {
                const user = await UserModel.findById(userId);
                const indexOfTodoId = user.todoList.indexOf(todo._id);
                user.todoList.splice(indexOfTodoId, 1);
                await user.save();

                await TodoModel.findByIdAndDelete(id)
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