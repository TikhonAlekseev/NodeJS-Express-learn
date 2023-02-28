import {Schema , model} from 'mongoose';

const Token = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
  refreshToken: { type: String, require: true }
})

export default model('Token', Token)