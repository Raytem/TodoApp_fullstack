import axios from "axios";
import { ITodo } from "../models/ITodo";
import { ITodoForChange } from "../models/ITodoForChange";
import config from '../../config.json'

class TodoService {
    
    public async getTodosByUserId(userId: string ,page?: number, limit?: number): Promise<ITodo[]> {
        const response = await axios.get<ITodo[]>( `${config.API_URL}/users/${userId}/todos`,
        {
            params: {
                page: page,
                limit: limit
            }
        });
        return response.data;
    }

    public async update(todoId: string ,fieldsToUpdate: ITodoForChange) {
        const response = await axios.patch<ITodo>(`${config.API_URL}/todos/${todoId}`, fieldsToUpdate);
        return response.data;
    }

    public async delete(userId: string, todoId: string) {
        const response = await axios.delete(`${config.API_URL}/${todoId}/${userId}`);
        return response.data;
    }
    
}

export default new TodoService();