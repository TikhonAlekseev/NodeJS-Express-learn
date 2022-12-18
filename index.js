require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose')

const usersRouter = require('./routes/users')
const roomsRouter = require('./routes/rooms')
const messagesRouter = require('./routes/messages')
const webSocketsInital = require('./socket/index')
const app = express();
const server = http.createServer(app)


app.use(cors());
app.use(express.json());
webSocketsInital(server);

//routers
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/messages', messagesRouter);

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log('MongoDB is running')
        server.listen(process.env.PORT, () => {
            console.log('server is running ' + process.env.PORT)
        })
    })


