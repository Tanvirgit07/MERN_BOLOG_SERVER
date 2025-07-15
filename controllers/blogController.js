const cloudinary = require("../cloudinary/cloudinaryConfig");
const createBlog = async(req,res,next) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "mern-blog"
    })

    console.log(result)
}


const updateBlog = (req,res,next) => {
    
}


const singleBlog = (req,res,next) => {
    
}


const deleteBlog = (req,res,next) => {
    
}


const allBlog = (req,res,next) => {
    
}


module.exports = {allBlog, singleBlog,createBlog,updateBlog,deleteBlog}