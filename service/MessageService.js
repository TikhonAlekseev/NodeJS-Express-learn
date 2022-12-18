const Message = require("../models/message");

class MessageService {
    async createMessage({ text, roomId, userId }) {
        if(!text || !roomId || !userId){
            throw new Error({ message:"parameter 'name' is invalid" })
        }
        await Message.create({ text, roomId, userId } )
    }
    async getMessages(roomId) {
        const messages = await Message.find({roomId})
        return messages
    }
}

module.exports = new MessageService();