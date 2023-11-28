const express = require("express");
const router = express.Router();
const {user_sign_up, user_login} = require("../controllers/user_controller");

//user sign_up route
router.post('/sign_up', user_sign_up);

//user login route
router.post('/login', user_login);