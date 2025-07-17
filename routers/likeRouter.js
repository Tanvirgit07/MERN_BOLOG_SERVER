const express = require("express");
const { createLike, showLike } = require("../controllers/likeController");
const likeRouter = express.Router();


likeRouter.post("/do-like/:blogId", createLike);
likeRouter.get("/all-like/:blogId", showLike);


module.exports = likeRouter;