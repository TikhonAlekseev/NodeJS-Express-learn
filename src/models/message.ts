import { Schema, model } from 'mongoose';

const Message = new Schema({
  text: { 
    type: String, 
    require: true 
  },
  roomId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Room' 
  },
  user: {
    id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    username: { 
      type: String, 
      require: true 
    },
    email: { 
      type: String, 
      require: true 
    },
  }
});

export default model('Message', Message);