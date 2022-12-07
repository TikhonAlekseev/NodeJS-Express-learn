require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users')
const roomsRouter = require('./routes/rooms')
const messagesRouter = require('./routes/messages')
const mongoose = require('mongoose')


const app = express();
app.use(cors());
app.use(express.json());

//routers
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/messages', messagesRouter);

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log('MongoDB is running')
        app.listen(process.env.PORT, () => {
            console.log('server is running ' + process.env.PORT)
        })
    })


