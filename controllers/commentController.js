const handleError = require("../helpers/handleError");
const commentModal = require("../model/commentModal");

const createComment = async (req, res, next) => {
    try {
        const blogId = req.params;
        const { userId, comment } = req.body;
        console.log(blogId);
        console.log(userId, comment);

        const newComment = new commentModal({
            userId: userId,
            blogId: blogId,
            comment: comment,
        })

        await newComment.save();

        res.status(200).json({
            status: true,
            message: "Send comment successfully!",
            newComment
        })
    } catch (err) {
        next(handleError(500, err.message));
    }


}


const commentCount = async (req, res, next) => {
    try {
        const  {blogId}  = req.params;
        const count = await commentModal.countDocuments({ blogId })
        const totalComment = await commentModal.find({ blogId })

        res.status(200).json({
            status: true,
            totalComment,
            count
        })
    } catch (err) {
        next(handleError(500, err.message));
    }
}

module.exports = {
    createComment,
    commentCount
}