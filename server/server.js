require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const user_routes = require("./routes/user_routes");

const app = express();

// middleware
app.use(cors(
    {
        origin: "http://localhost:3000/"
    }
))
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
    .then(()=> {
        console.log("Connected to db");
    })

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});