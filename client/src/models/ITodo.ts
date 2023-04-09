import { IData } from './IData';

export interface ITodo extends IData {
    id: string,
    title: string,
    body: string,
    isCompleted: boolean,
    cntOfUsers: number,
    createdAt: Date,
    updatedAt: Date,
    userList: Array<string>,
    creator: string
    [index: string]: any
}