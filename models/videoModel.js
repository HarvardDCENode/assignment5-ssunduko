//video.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * This is Schema object representing Video Review
 * @type {module:mongoose.Schema<Document, Model<any, any>, undefined>}
 */
const reviewSchema = new Schema({
  rating: {type: String, required:false},
  review: {type: String, required:false}
});

/**
 * This is a Schema object representing Video data
 * @type {module:mongoose.Schema<Document, Model<any, any>, undefined>}
 */
const schema = new Schema({
  title: {type: String, required:false},
  description: {type: String, required:false},
  averageRating: {type: String, required:false},
  reviews: [reviewSchema]
});

// export the model with associated name and schema
module.exports = mongoose.model("Video", schema);
