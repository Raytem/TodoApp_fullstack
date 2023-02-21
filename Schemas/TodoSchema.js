import mongoose from "mongoose";
import { Schema } from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    isCompleted: {type: Boolean, required: true},
    userID: {type: Schema.Types.ObjectId}
});

export default mongoose.model('todo', TodoSchema);