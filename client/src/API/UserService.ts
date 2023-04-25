import axios from "axios";
import { IUser } from "../models/IUser";
import config from '../../config.json'
import $api from '../http/index'

class UserService {

    public async getAll(): Promise<IUser[]> {
        const response = await $api.get<IUser[]>(`/users`);
        return response.data
    }
    
}

export default new UserService();