require("dotenv").config()
const jwt = require("jsonwebtoken");
const axios = require("axios");

const mongoose = require("mongoose");
const Chat_Session = require("../models/chat_model");
const User = require("../models/user_model");
const Book = require("../models/book_model");
const { upload_book_image } = require("../cloud/uploadImage");

const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink);


// create session token
const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

//user sign_up
const user_sign_up = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const user_id = user._id;
        const token = createToken(user_id);
        res.status(200).json({ user_id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//user login
const user_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const user_id = user._id;
        const token = createToken(user_id);
        res.status(200).json({ user_id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get available books
const available_books = async (req, res) => {
    try {
        const available_books = await Book.find();
        res.status(200).json({ available_books });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// get books from google books api
const google_book_search = async (req, res) => { }

// find specific book from db
const find_book_db = async (req, res) => {
    const { title } = req.body;
    try {
        const found_books = await Book.find({ title: title });
        res.status(200).json({ found_books })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Add new book 
const add_new_book = async (req, res) => {
    const { title, author, genre, thumbnail_url, owner_id } = req.body;
    try {
        await upload_book_image(req.file.path)
            .then(async (response) => {
                // delete image from local storage
                await unlinkAsync(req.file.path);

                if (response.error) {
                    res.status(400).json({ error: response.error })
                } else {
                    const image_name = response.fileName;
                    const image_url = response.publicUrl;
                    const added_book = await Book.create({ title, author, genre, thumbnail_url, book_owners: [{ _id: owner_id, image_name, image_url }] });
                    res.status(200).json({ added_book });
                }
            }
            )
    } catch (error) {
        // delete image from local storage
        // await unlinkAsync(req.file.path);
        res.status(400).json({ error: error.message })
    }

}

// Add new copy of an available book
const add_new_copy = async (req, res) => {
    const { book_id, owner_id } = req.body;

    try {
        await upload_book_image(req.file.path)
            .then(async (response) => {
                // delete image from local storage
                await unlinkAsync(req.file.path);
                if (response.error) {
                    res.status(400).json({ error: image_data.error })
                } else {
                    const image_name = response.fileName;
                    const image_url = response.publicUrl;
                    const added_copy = await Book.findByIdAndUpdate({ _id: book_id }, { $push: { book_owners: { _id: owner_id, image_name, image_url } } }, { new: true });
                    res.status(200).json({ added_copy });
                }
            })
    } catch (error) {
        // delete image from local storage
        await unlinkAsync(req.file.path);
        res.status(400).json({ error: error.message });
    }

}

// get book from google books api
const get_book_google = async (req, res) => {
    const { title, author } = req.body;
    let data;
    await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=40`)
        .then(res => {
            data = res.data;
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
    res.status(200).json({ data });
}
// get chat session 
const get_chat_session = async (req, res) => {

    const { user_id } = req.params;
    try {
        const chat_session = await Chat_Session.find({ members: { $in: [user_id] } });
        res.status(200).json({ chat_session });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// Add chat session 
const add_chat_session = async (req, res) => {
    const { sender_id, receiver_id, message } = req.body;
    try {
        const chat_session = await Chat_Session.findOneAndUpdate(
            { members: { $all: [sender_id, receiver_id] } },
            {
                $push: { messages: { sender: sender_id, message, timestamp: Date.now() } },
                $setOnInsert: { members: [sender_id, receiver_id] }
            },
            { new: true, upsert: true });
        res.status(200).json({ chat_session });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    user_sign_up, user_login, available_books, google_book_search, find_book_db,
    add_new_copy, get_book_google, add_new_book, get_chat_session, add_chat_session
};
