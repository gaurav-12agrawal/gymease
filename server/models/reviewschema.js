const mongoose = require('mongoose');
const { Schema } = mongoose;
const reviewSchema = new Schema({
    review: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});
const Review = new mongoose.model("reviews", reviewSchema);
module.exports = Review;
