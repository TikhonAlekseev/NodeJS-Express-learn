const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const roomsRouter = require('./routes/rooms')
const messagesRouter = require('./routes/messages')
const authRouter = require('./routes/auth')

const webSocketsInitial = require('./socket/index');
const { DB_URL, PORT } = require('./config');

const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

webSocketsInitial(server);

app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/messages', messagesRouter);

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log('MongoDB is running')
        server.listen(PORT, () => {
            console.log('server is running ' + PORT)
        })
    })


