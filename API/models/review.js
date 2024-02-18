const mongoose = require('mongoose')
const ReviewSchema = new mongoose.Schema({
    stars: Number,
    review:String
})
const Review = new mongoose.model('Review',ReviewSchema);

module.exports = Review;