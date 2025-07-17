const mongoose = require("mongoose");
const likeSchema =  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Blog"
    }
})


const LikeModal = mongoose.model("Like", likeSchema);
module.exports = LikeModal