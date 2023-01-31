const Message = require("../models/message");
const Room = require("../models/room");

class RoomService {

    async getRooms() {
        const rooms = await Room.find();
        const roomsFormats = rooms.map(room =>( { id:room._id.toString(), name:room.name }))
        return roomsFormats
    }

    async createRoom(name) {
        if(!name){
            throw new Error({message:"parameter 'name' is invalid"})
        }

        await Room.create( { name } )
    }

    async deleteRoom(id) {
        if(!id){
            throw new Error({ message:"parameter 'id' is not exists" } )
        }
        await Message.remove({roomId:id})
        await Room.findByIdAndDelete(id)
    }
}

module.exports = new RoomService();