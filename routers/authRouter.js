const express = require("express");
const {Register,Login, GoogleLogin, Logout} = require("../controllers/authController");
const authRoute = express.Router();


authRoute.post('/register', Register);
authRoute.post('/login', Login);
authRoute.post('/google-login', GoogleLogin);
authRoute.get('/logout', Logout);

module.exports = authRoute;