require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const user_routes = require("./routes/user_routes");

//
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000/*",
    }
});
//

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//middleware to authenticate user
/*io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});*/

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
