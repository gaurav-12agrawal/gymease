const mongoose = require('mongoose');
const Review = require('../models/reviewschema')

const { Schema } = mongoose;
const gymSchema = new Schema({
    name: String,
    city: String,
    address: String,
    url: String,
    information: String,
    workouts: String,
    facilities: String,
    images: [{
        url: String,
        filename: String
    }],
    price: {
        fifdays: Number,
        month: Number,
        threemonth: Number,
        sixmonth: Number,
        oneyear: Number,
        fifdayst: Number,
        montht: Number,
        threemontht: Number,
        sixmontht: Number,
        oneyeart: Number,

    },
    sex: {
        male: Boolean,
        female: Boolean
    },
    timing: {
        start: String,
        end: String
    },
    ac: Boolean,
    varified: Boolean,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'reviews'
        }
    ]
});


gymSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const gyms = new mongoose.model("gyms", gymSchema);
module.exports = gyms;
