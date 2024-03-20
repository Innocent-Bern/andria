require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const Chat_Session = require("./models/chat_model");
const user_routes = require("./routes/user_routes");

//
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
//

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        //console.log(`user with id-${socket.id} joined room - ${roomId}`);
    });

    socket.on("send_message", async (data) => {
        //console.log(data, "DATA");
        const { sender_id, receiver_id, message } = data;
        const chat_session = await Chat_Session.findOneAndUpdate(
            { members: { $all: [{ $elemMatch: { $eq: sender_id } }, { $elemMatch: { $eq: receiver_id } }] } },
            {
                $push: { messages: { sender: sender_id, message, timestamp: Date.now() } },
                $setOnInsert: { members: [sender_id, receiver_id] }
            },
            { new: true, upsert: true });

        //This will send a message to a specific room ID
        socket.to(data.roomId).emit("receive_message", chat_session);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
    next()
})

// routes
app.use("/api/", user_routes);

//connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to db");
    })

const port = parseInt(process.env.PORT) || 8080;
server.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});
