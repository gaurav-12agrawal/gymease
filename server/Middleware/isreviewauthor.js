
const Review = require('../models/reviewschema')

const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.userID)) {
        return res.sendStatus(400)
    }
    next();
}
module.exports = isReviewAuthor