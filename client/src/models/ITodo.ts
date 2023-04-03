import { IData } from './IData';

export interface ITodo extends IData {
    id: string,
    title: string,
    body: string,
    isCompleted: boolean
    creationDate: Date,
    lastModified: Date,
    userList: Date
    [index: string]: any
}