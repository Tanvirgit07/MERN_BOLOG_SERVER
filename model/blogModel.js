const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: "Category"
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    blogContent: {
        type:String,       
        required: true,
        trim: true
    }, 
    featuredImage: {
        type: String,
        required: true,
        trim: true
    },
    publicId: {
        type: String,
        trim: true,
    }

})


const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;