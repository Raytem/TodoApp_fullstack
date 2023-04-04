import axios from "axios";
import { ITodo } from "../models/ITodo";
import { ITodoForChange } from "../models/ITodoForChange";

class TodoService {

    private SERVER_URL: string = 'http://localhost:8081';
    
    public async getAll(page?: number, limit?: number): Promise<ITodo[]> {
        const response = await axios.get<ITodo[]>( `${this.SERVER_URL}/todos`,
        {
            params: {
                page: page,
                limit: limit
            }
        });
        return response.data;
    }

    public async update(todoId: string ,fieldsToUpdate: ITodoForChange) {
        const response = await axios.patch<ITodo>(`${this.SERVER_URL}/todos/${todoId}`, fieldsToUpdate);
        return response.data;
    }

    public async delete(userId: string, todoId: string) {
        const response = await axios.delete(`${this.SERVER_URL}/${todoId}/${userId}`);
        return response.data;
    }
    
}

export default new TodoService();