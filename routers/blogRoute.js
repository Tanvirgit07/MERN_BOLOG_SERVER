const express = require('express');
const { createBlog, updateBlog, deleteBlog, singleBlog, allBlog } = require('../controllers/blogController');
const upload = require('../multer/singleMulterMiddleware');
const blogRouter = express.Router()


blogRouter.post("/create-blog",upload.single('image'), createBlog);
blogRouter.post("/update-blog/:id", updateBlog);
blogRouter.post("/delete-blog/:id", deleteBlog);
blogRouter.post("/single-blog/:id", singleBlog);
blogRouter.post("/all-blog", allBlog);


module.exports = blogRouter;