const express = require("express");
const router = express.Router();
const requireUsertAuth = require("../middleware/requireUserAuth");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const {
    user_sign_up, user_login, available_books,
    google_book_search, find_book_db, add_new_copy,
    get_book_google, add_new_book,
    get_chat_session, add_chat_session, get_user_books
} = require("../controllers/user_controller");

//user sign_up route
router.post('/signup', user_sign_up);

//user login route
router.post('/login', user_login);

// require authentication routes below
router.use(requireUsertAuth)

// get available books
router.get('/available_books', available_books);

// perform google api book search
router.get('/get_books_google/', google_book_search);

// find a books from google books api
router.post('/get_books_google', get_book_google)

// find a specific book from database
router.post('/find_book', find_book_db);

// add new book
router.post('/add_new_book', upload.single('file'), add_new_book);

// Add a new copy of a specific book
router.post('/add_new_copy', upload.single('file'), add_new_copy);

//get chat session 
router.get('/get_chat/:user_id', get_chat_session);

//add chat session
router.post('/add_chat/', add_chat_session);

// get user's books
router.get('/get_user_books/:user_id', get_user_books);

module.exports = router;
