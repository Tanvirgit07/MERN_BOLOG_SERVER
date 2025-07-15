const express = require('express');
const { createBlog, updateBlog, deleteBlog, singleBlog, allBlog } = require('../controllers/blogController');
const upload = require('../multer/singleMulterMiddleware');
const blogRouter = express.Router()


blogRouter.post("/create-blog",upload.single('image'), createBlog);
blogRouter.put("/update-blog/:id",upload.single("image"), updateBlog);
blogRouter.delete("/delete-blog/:id", deleteBlog);
blogRouter.get("/single-blog/:id", singleBlog);
blogRouter.get("/all-blog", allBlog);


module.exports = blogRouter;