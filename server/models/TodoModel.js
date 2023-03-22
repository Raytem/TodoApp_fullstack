import mongoose, { ObjectId } from "mongoose";
import UserDTO from "../DTOs/UserDTO.js";
import UserModel from "./UserModel.js";

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    creationDate: {type: Date, default: (Date.now() + 10800000)},
    lastModified: {type: Date, default: (Date.now() + 10800000)},
    userList: [{ref: 'users', type: ObjectId}]
}, { toJSON: {virtuals: true}, toObject: {virtuals: true} });

todoSchema.virtual('cntOfUsers').get(function() {
    return this.userList.length;
});

todoSchema.virtual('creatorId').get(function() {
    if (this.userList.length !== 0) {
        return this.userList[0];
    } else {
        return null
    }
})

export default mongoose.model('todos', todoSchema);