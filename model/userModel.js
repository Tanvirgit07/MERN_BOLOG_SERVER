const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "user",
        enum:["user", "admin"],
        reqired: true,
        trim: true
    },
    name: {
        type: String,
        reqired: true,
        trim: true
    }, 
    email: {
        type: String,
        requried: true,
        trim: true,
        unique: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        trim: true,
    }
})


const User = mongoose.model("user", userSchema)
module.exports = User