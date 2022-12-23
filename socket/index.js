const webSocket = require('ws');
const MessageService = require('../service/MessageService')

const webSocketsInital = (server) => {
    const wss = new webSocket.WebSocketServer({ server });

    wss.on('connection', (socket, request) => {
        if( request.url === '/socket' ){
            socket.on('message',  async (data) => {

                const newMessage = JSON.parse(data)

                const message = JSON.stringify(await MessageService.createMessage({...newMessage,userId:123}))

                wss.clients.forEach((client) => {

                    if (client.readyState === webSocket.OPEN) {
                        client.send(message);
                    }
                });
            })
        }
    })
}

module.exports = webSocketsInital;