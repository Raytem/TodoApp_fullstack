import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import UserModel from "./UserModel.js";

const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    isCompleted: {type: Boolean, required: true},
    userID: {type: Schema.Types.ObjectId},
    creationDate: {type: Date, default: (Date.now() + 10800000)},
    lastModified: {type: Date, default: (Date.now() + 10800000)},
    performers_ids: [{ref: 'user', type: Schema.Types.ObjectId}]
}, { toJSON: {virtuals: true}, toObject: {virtuals: true} });

TodoSchema.virtual('cntOfPerformers').get(function() {
    return this.performers_ids.length;
});

export default mongoose.model('todo', TodoSchema);