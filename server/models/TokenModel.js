import {mongoose, Schema} from "mongoose";

const TokenModel = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    refreshToken: {type: String, required: true}
})

export default model('token', TokenModel);