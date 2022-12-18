const mongoose = require('mongoose');

const Message = mongoose.Schema({
    text: { type:String, require:true },
    userId: { type:String, require:true},
    roomId: { type:mongoose.Schema.Types.ObjectId, ref:'Room' }
})

module.exports = mongoose.model('Message', Message)