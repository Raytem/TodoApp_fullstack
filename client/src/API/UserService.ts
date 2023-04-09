import axios from "axios";
import { IUser } from "../models/IUser";
import config from '../../config.json'

class UserService {

    public async getAll(): Promise<IUser[]> {
        const response = await axios.get<IUser[]>(`${config.API_URL}/users`);
        return response.data
    }
    
}

export default new UserService();