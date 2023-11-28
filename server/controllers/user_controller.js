const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

// create session token
const createToken = (_id) =>{
    return jwt.sign({_id: _id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

//user sign_up
const user_sign_up = async (req, res) => {
    const {email, passowrd} = req.body;

    try {
        const user = await User.signup(email, passowrd);
        const user_id = user._id;
        const token = createToken(user_id);
        res.status(200).json({user_id, token});
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

//user login
const user_login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const user_id = user._id;
        const token = createToken(user_id);
        res.status(200).json({user_id, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {user_sign_up, user_login};