const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    genre: {
        type: String
    },
    thumbnail_url: {
        type: String
    },
    book_owners: [
        {
            owner_email: String,
            image_name: String,
            image_url: String
        }
    ]
}, { timestamps: true })

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
