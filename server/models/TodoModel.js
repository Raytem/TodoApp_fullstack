import mongoose, { ObjectId } from "mongoose";
import UserDTO from "../DTOs/UserDTO.js";
import UserModel from "./UserModel.js";

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    userList: [{ref: 'users', type: ObjectId}],
    creator: {type: String}
}, { toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true });

todoSchema.virtual('cntOfUsers').get(function() {
    return this.userList.length;
});

export default mongoose.model('todos', todoSchema);