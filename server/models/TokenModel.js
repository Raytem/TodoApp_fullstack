import mongoose from "mongoose";
import { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    refreshToken: {type: String, required: true}
})

export default mongoose.model('tokens', tokenSchema);