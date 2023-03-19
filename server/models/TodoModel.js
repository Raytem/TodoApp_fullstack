import mongoose, { ObjectId } from "mongoose";
import { Schema } from "mongoose";
import UserModel from "./UserModel.js";

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    creationDate: {type: Date, default: (Date.now() + 10800000)},
    lastModified: {type: Date, default: (Date.now() + 10800000)},
    userList: [{ref: 'user', type: ObjectId}]
}, { toJSON: {virtuals: true}, toObject: {virtuals: true} });

todoSchema.virtual('cntOfUsers').get(function() {
    return this.userList.length;
});

export default mongoose.model('todo', todoSchema);