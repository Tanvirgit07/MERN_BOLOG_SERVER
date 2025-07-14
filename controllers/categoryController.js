const handleError = require("../helpers/handleError");
const CategoryModel = require("../model/categoryModel");

const showAllCategory = async (req, res, next) => {
    try {
        const allCategory = await CategoryModel.find()
        res.status(200).json({
            status: true,
            message: "Category fetch successfully!",
            allCategory
        })
    } catch (err) {
        next(handleError(500, err.message));
    }
}


const showSingleCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const singleCategory = await CategoryModel.findById(id);

        res.status(200).json({
            status: true,
            message: "Category fetch successfully!",
            singleCategory
        })
    } catch (err) {
        next(handleError(500, err.message))
    }


}


const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, slug } = req.body;
        console.log(name,slug)
        const updateCategory = await CategoryModel.findByIdAndUpdate(
            id,
            { name: name, slug: slug },
            { new: true }
        )

        res.status(200).json({
            status: true,
            message: "Category update successfully!",
            updateCategory
        })
    } catch (err) {
        next(handleError(400, err.message))
    }
}


const createCategory = async (req, res, next) => {

    try {
        const { name, slug } = req.body;
        if (!name || !slug) {
            res.status(400).json({
                message: "Name and slug are required!"
            })
        }

        const newCategory = new CategoryModel({
            name,
            slug
        })


        await newCategory.save();

        res.status(200).json({
            status: true,
            message: "Category created successfully!",
            newCategory
        })

    } catch (err) {
        next(handleError(500, err.message))
    }

}


const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteCategory = await CategoryModel.findByIdAndDelete(id);

        res.status(200).json({
            status: true,
            message: "Category delete successfully!",
            // deleteCategory
        })


    } catch (err) {
        next(handleError(400, err.message))
    }
}



module.exports = { showAllCategory, showSingleCategory, deleteCategory, createCategory, updateCategory }