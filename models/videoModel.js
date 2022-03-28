//video.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {type: String, required:false},
  review: {type: String, required:false}
});

const schema = new Schema({
  title: {type: String, required:false},
  description: {type: String, required:false},
  averageRating: {type: String, required:false},
  reviews: [reviewSchema]
});

// export the model with associated name and schema
module.exports = mongoose.model("Video", schema);
