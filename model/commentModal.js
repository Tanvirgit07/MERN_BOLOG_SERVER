const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }, 
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Blog"
    },
    comment:{
        type: String,
        required: true,
        trim: true
    }
})


const commentModal = mongoose.model("Comment", commentSchema);
module.exports = commentModal;