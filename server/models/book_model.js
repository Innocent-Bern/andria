const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    author : {
        type : String,
    },
    genre : {
        type: String
    },
    thumbnail_url: {
        type: String
    },
    book_owners: [
        {
            owner_id: {
                type: String
            },
            image_name: {
                type: String,
            },
            image_url: {
                type: String
            }
        }
    ]
}, { timestamps: true })

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;