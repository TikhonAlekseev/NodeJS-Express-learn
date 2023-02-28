import {Schema , model} from 'mongoose';

const Room = new Schema({
  name: { type: String, require: true }
})

export default model('Room', Room)