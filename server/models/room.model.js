const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room: { type: String, required: true},
    player1:{ type: Object},
    player2:{ type: Object},
    password:{ type: String}
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema)

module.exports = Room;