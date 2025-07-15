const cloudinary = require("../cloudinary/cloudinaryConfig");
const handleError = require("../helpers/handleError");
const Blog = require("../model/blogModel");
const fs = require('fs');
const createBlog = async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            // folder: "Dynamic folders"
        })

        const newBlog = new Blog({
            authorId: req.body.authorId,
            categoryId: req.body.categoryId,
            title: req.body.title,
            slug: req.body.slug,
            blogContent: req.body.blogContent,
            featuredImage: result.secure_url,
            publicId: result.public_id
        })

        await newBlog.save()
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            status: true,
            message: "Blog Create successfully!",
            newBlog
        })
    } catch (err) {
        next(handleError(500, err.message))
    }
}


const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingData = await Blog.findById(id);
        if (!existingData) {
            return next(handleError(404, "Blog not found!"))
        }

        if (existingData) {
            await cloudinary.uploader.destroy(existingData.publicId)
            const result = await cloudinary.uploader.upload(req.file.path)

            const editBlog = await Blog.findByIdAndUpdate(id, {
                title: req.body.title,
                slug: req.body.slug,
                blogContent: req.body.blogContent,
                featuredImage: (await result).secure_url,
                publicId: (await result).public_id,
                authorId: req.body.authorId,
                categoryId: req.body.categoryId

            }, { new: true })
            fs.unlinkSync(req.file.path);
            res.status(200).json({
                status: true,
                message: "Blog update successfully!",
                editBlog
            })
        }
    } catch (err) {
        next(handleError(500, err.message))
    }
}


const singleBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return next(handleError(404, "Blog not found!"))
        }

        if (blog) {
            const singleBlog = await Blog.findById(id);
            res.status(200).json({
                status: true,
                message: "Successfully fetch single blog!",
                singleBlog
            })
        }
    } catch (err) {
        next(handleError(500, err.message))
    }
}


const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return next(handleError(404, "Blog not found!"))
        }



        if (blog) {
            const deleteBlog = await Blog.findByIdAndDelete(id)
            res.status(200).json({
                status: true,
                message: "Blog Delete successfully!"
            })
        }
    } catch (err) {
        next(handleError(500, err.message))
    }
}


const allBlog = async (req, res, next) => {
try{
const allBlog = await Blog.find();
res.status(200).json({
    status: true,
    message: "Successfully fetch all blog!",
    allBlog
})
}catch(err){
    next(handleError(500, err.message))
}
}


module.exports = { allBlog, singleBlog, createBlog, updateBlog, deleteBlog }