const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 

    slug: {
        type : String,
        required: true,
        unique: true,
        trim: true,
    }
})



const CategoryModel = mongoose.model("category", categorySchema);
module.exports = CategoryModel;