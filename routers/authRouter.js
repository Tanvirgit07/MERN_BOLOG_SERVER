const express = require("express");
const {Register,Login} = require("../controllers/authController");
const authRoute = express.Router();


authRoute.post('/register', Register);
authRoute.post('/login', Login);

module.exports = authRoute;