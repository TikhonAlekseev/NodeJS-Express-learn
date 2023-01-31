const MessageDto = require("../dto/message-dto");
const Message = require("../models/message");

class MessageService {
  async createMessage({ text, roomId, user }) {
    if (!text || !roomId) {
      throw new Error({ message: "parameter 'name' is invalid" })
    }
    return await Message.create({ text, roomId, user })
  }
  async deleteMessage(id) {
    if (!id) {
      throw new Error({ message: "parameter 'id' is invalid" })
    }
    return await Message.findByIdAndDelete(id)
  }
  async getMessages(roomId) {
    const messages = await Message.find({ roomId })
    const messageDtos = messages.map((message) => new MessageDto(message))
    return messageDtos
  }
}

module.exports = new MessageService();
