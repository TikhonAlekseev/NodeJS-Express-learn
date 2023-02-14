require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const roomsRouter = require('./routes/rooms')
const messagesRouter = require('./routes/messages')
const authRouter = require('./routes/auth')

const webSocketsInital = require('./socket/index')
const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

webSocketsInital(server);

//routers
app.use('/api/auth', authRouter);
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


