const mongoose = require('mongoose');

const Message = mongoose.Schema({
  text: { type: String, require: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, require: true },
    email: { type: String, require: true },
  }
})

module.exports = mongoose.model('Message', Message)