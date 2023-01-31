const MessageService = require('../service/MessageService')

class MessageController {
  async createMessage(request, response) {
    try {
      const { text, roomId } = request.body;
      await MessageService.createMessage({ text, roomId, userId: "12345" })
      return response.json({ message: "messages is created" })
    }
    catch (e) {
      response.status(500).json({ message: "Ошибка записи в базу данных", error: e })
    }
  }

  async deleteMessage(request, response) {
    try {
      const { id } = request.params;
      await MessageService.deleteMessage(id)
      return response.json({ message: "messages is removed" })
    }
    catch (e) {
      response.status(500).json({ message: "Ошибка записи в базу данных", error: e })
    }
  }

  async getMessages(request, response) {
    try {
      const { id } = request.params;

      const messages = await MessageService.getMessages(id)
      return response.json(messages)
    }
    catch (e) {
      response.status(500).json({ message: "Ошибка получения сообщений", error: e })
    }
  }
}

module.exports = new MessageController();               