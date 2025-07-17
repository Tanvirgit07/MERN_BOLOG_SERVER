const handleError = require("../helpers/handleError");
const LikeModal = require("../model/likeModal");

const createLike = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const { userId } = req.body;
        const existingLike = await LikeModal.findOne({ blogId, userId });

        if (existingLike) {
            await LikeModal.findByIdAndDelete(existingLike._id);
            res.status(200).json({
                status: true,
                message: "Like removed !"
            })
        } else {
            const newLike = new LikeModal({
                blogId: blogId,
                userId: userId
            })

            await newLike.save();

            const populateUser = await LikeModal.findById(newLike._id).populate("userId");

            res.status(200).json({
                status: true,
                message: "Like Added !",
                newLike: populateUser
            })
        }
    } catch (err) {
        next(handleError(500, err.message))
    }
}


const showLike = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const likes = await LikeModal.find({ blogId });
        const likeCount = await LikeModal.countDocuments({blogId});
        res.status(200).json({
            status: true,
            message: "Fetch Likes successfully!",
            likes : {
                likeCount,
                likes
            }
        })
    } catch (err) {
        next(handleError(500, err.message));
    }
}


module.exports = { createLike, showLike };