require("dotenv").config()
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const Book = require("../models/book_model");


const axios = require("axios");

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: `./gcp_private_key.json`,
});

const fs = require('fs')
const { promisify } = require('util')

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
    const { title, author } = req.body;
    try {
        const found_books = await Book.find({ title: title, author: author });
        res.status(200).json({ found_books })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// upload users book image to gcp
const upload_image = async (req, res) => {
    /**
     * Resource used: https://dev.to/kamalhossain/upload-file-to-google-cloud-storage-from-nodejs-server-5cdg
     */
    const myBucket = storage.bucket('andria_user_book_images');


    myBucket.upload(
        req.file.path,
        {
            destinatin: 'andria_user_book_images/'
        },
        async (err, file) => {
            if (err) {
                console.error(`Error uploading: ${err}`);
                res.status(400).json({ error: "Couldn't upload image" })
            } else {
                // Make the file public
                file.makePublic(async function (err) {
                    if (err) {
                        res.status(400).json({ error: "Couldn't make image public" })
                    } else {
                        const publicUrl = file.publicUrl();
                        res.status(200).json(publicUrl);
                    }
                })
                // handle file deletion after upload
                const unlinkAsync = promisify(fs.unlink);
                await unlinkAsync(req.file.path);
            }
        })
}

// Add new copy of an available book
const add_new_copy = async (req, res) => {
    const { book_id, owner_details } = req.body;
    try {
        const added_copy = await Book.findByIdAndUpdate({ _id: book_id }, { $push: { book_owners: owner_details } }, { new: true });
        res.status(200).json({ added_copy });
    } catch (error) {
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

module.exports = {
    user_sign_up, user_login, available_books, google_book_search, find_book_db,
    add_new_copy, get_book_google, upload_image
};