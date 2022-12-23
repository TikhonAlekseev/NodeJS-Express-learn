const mongoose = require('mongoose');

const Token = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", require:true},
    refreshToken:{type:String, require:true}
})

module.exports = mongoose.model('Token', Token)