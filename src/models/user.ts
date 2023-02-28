import {Schema , model} from 'mongoose';

const User = new Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
})

export default model('User', User)