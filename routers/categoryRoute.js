const express = require('express');
const { createCategory, showAllCategory, showSingleCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const categoryRouter = express.Router();

categoryRouter.get("/all-category",showAllCategory)
categoryRouter.get("/single-category/:id", showSingleCategory)
categoryRouter.post("/create-category", createCategory)
categoryRouter.put("/update-category/:id", updateCategory)
categoryRouter.delete("/delete-category/:id", deleteCategory)


module.exports = categoryRouter;