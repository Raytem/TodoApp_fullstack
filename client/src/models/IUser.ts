import { IData } from "./IData";

export interface IUser extends IData {
    id: number,
    name: string,
    email: string
}