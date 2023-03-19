import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    nickName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todoList: [{ref: "todo", type: mongoose.Schema.Types.ObjectId}],
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, default: ""}
});

export default mongoose.model('user', userSchema);