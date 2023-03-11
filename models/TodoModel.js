import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import UserModel from "./UserModel.js";

const UserSchema = UserModel.schema;

const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    isCompleted: {type: Boolean, required: true},
    userID: {type: Schema.Types.ObjectId},
    creationDate: {type: Date, default: Date.now},
    performers: [{ref: UserSchema, type: Schema.Types.ObjectId}]
}, { toJSON: {virtuals: true}, toObject: {virtuals: true} });

TodoSchema.virtual('cntOfPerformers').get(function() {
    return this.performers.length;
});

export default mongoose.model('todo', TodoSchema);