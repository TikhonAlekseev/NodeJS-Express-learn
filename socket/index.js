const webSocket = require('ws');
const MessageService = require('../service/MessageService')
const User = require('../models/user');
const UserDto = require('../dto/user-dto');
const MessageDto = require('../dto/message-dto');


const webSocketsInital = (server) => {
  const wss = new webSocket.WebSocketServer({ server });

  wss.on('connection', (socket, request) => {
    if (request.url === '/socket') {
      socket.on('message', async (data) => {

        const newMessage = JSON.parse(data)
        const userData = await User.findById(newMessage.userId);
        const userDto = new UserDto(userData);
        const message = await MessageService.createMessage({ ...newMessage, user: userDto });
        const messageDto = new MessageDto(message)
        const result = JSON.stringify(messageDto)

        wss.clients.forEach((client) => {

          if (client.readyState === webSocket.OPEN) {
            client.send(result);
          }
        });
      })
    }
  })
}

module.exports = webSocketsInital;