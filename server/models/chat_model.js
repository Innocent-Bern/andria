const mongoose = require("mongoose");

const chat_schema = new mongoose.Schema({
    session_id: {
        type: String
    },
    members: [String]
    ,
    messages: [
        {
            sender: String,
            message: String,
            timestamp: Date
        }
    ]
}, { timestamps: true })

const Chat_Session = mongoose.model("Chat_Session", chat_schema)

module.exports = Chat_Session;
