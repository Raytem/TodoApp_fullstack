import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    nickName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

export default mongoose.model('user', userSchema);