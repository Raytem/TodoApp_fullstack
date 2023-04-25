import { IData } from "./IData";

export interface IUser extends IData {
    _id: string;
    nickName: string;
    email: string;
    isActivated: boolean;
    todoList: Array<string>;
}