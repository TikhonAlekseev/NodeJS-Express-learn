const mongoose = require('mongoose');

const Room = mongoose.Schema({
    name: { type: String, require: true }
})

module.exports = mongoose.model('Room', Room)