import axios from "axios";
import { IUser } from "../models/IUser";

class UserReq {

    public async getAll(): Promise<IUser[]> {
        const response: IUser[] = await (await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')).data;
        return response
    }
    
}

export default new UserReq();