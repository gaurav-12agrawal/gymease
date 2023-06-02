const express = require('express');
const reviewrouter = express.Router();
const gyms = require('../models/gymschema')
const Review = require('../models/reviewschema')
const authenticate = require('../Middleware/authentication')
const isReviewAuthor = require('../Middleware/isreviewauthor')
reviewrouter.post("/detials/:id/reviews/:token", authenticate, async (req, res) => {
    try {
        if (!req.body.review || !req.body.rating || req.body.review === '')
            return res.sendStatus(400)
        const { id } = req.params;
        const gym = await gyms.findById({ _id: id });
        const review = new Review(req.body)
        review.author = req.userID

        gym.reviews.push(review)
        await review.save();
        await gym.save();
        res.status(200).json({ status: 200, message: "Good" });
    } catch (error) {
        res.status(400).json({ status: 400, message: "Bad" });
        console.log(error)
    }

})
reviewrouter.delete("/detials/:id/reviews/:reviewId/:token", authenticate, isReviewAuthor, async (req, res) => {
    try {
        const { id, reviewId } = req.params
        await gyms.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete({ _id: reviewId })

        res.status(200).json({ status: 200, message: "Good" });
    } catch (error) {
        res.status(400).json({ status: 400, message: "Bad" });
        console.log(error)
    }

})
reviewrouter.patch("/edit/review/:id/:token", async (req, res) => {
    try {
        const { id } = req.params
        const { review, rating } = req.body;
        const updatereview = await Review.findByIdAndUpdate(id, {
            review, rating

        }, { new: true });
        await updatereview.save();

        res.status(200).json({ status: 200, message: "Good" });

    } catch (error) {
        res.status(400).json({ status: 400, message: "Bad" });
        console.log(error)
    }

})


module.exports = reviewrouter;