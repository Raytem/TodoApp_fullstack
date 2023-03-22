import mongoose from "mongoose";
import { Schema } from "mongoose";
import TokenModel from "./TokenModel.js";

const userSchema = new mongoose.Schema({
    nickName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todoList: [{ref: "todos", type: mongoose.Schema.Types.ObjectId}],
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, required: true}
});

userSchema.post('findOneAndDelete', async function(user) {
    await TokenModel.findOneAndDelete({userId: user._id});
})

export default mongoose.model('users', userSchema);