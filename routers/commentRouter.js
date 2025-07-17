const express = require("express");
const { createComment, commentCount } = require("../controllers/commentController");
const commentRouter = express.Router();


commentRouter.post("/create-comment/:id", createComment);
commentRouter.get("/count-comment/:blogId", commentCount);


module.exports = commentRouter;