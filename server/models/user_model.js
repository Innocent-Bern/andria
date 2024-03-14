const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
    },
    user_books: [
        {
            book_id: String
        }
    ],
    users_lent_out_books: [
        {
            book_id: String
        }
    ],
    users_borrowed_books: [
        {
            book_id: String
        }
    ]
})

// static signup method
user_schema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Please enter a valid email")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt)

    const andria_user = await this.create({ email, password: hash })

    return andria_user
}

// static login method
user_schema.statics.login = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error("All fields must be field")
    }

    const andria_user = await this.findOne({ email })

    if (!andria_user) {
        throw Error("Incorrect email address")
    }

    const match = await bcrypt.compare(password, andria_user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return andria_user
}
const User = mongoose.model("User", user_schema)

module.exports = User;
