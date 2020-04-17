const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_category: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true,
    max: 30
  },
  product_name_hu: {
    type: String,
    required: true,
    max: 30
  },
  product_detail: {
    type: String,
    required: true,
    trim: true
  },
  product_detail_hu: {
    type: String,
    required: true,
    trim: true
  },
  product_area: Number,
  product_location: {
    type: String,
    required: true,
    max: 50,
    trim: true
  },
  product_location_hu: {
    type: String,
    required: true,
    max: 50,
    trim: true
  },
  product_price: {
    type: String,
    required: true
  },
  product_price_hu: {
    type: String,
    required: true
  },
  imageURL: Array,
  imageID: Array,
  date_of_creation: {
    type: Date,
    required: true
  }
});

productSchema.index({
  product_name: "text",
  product_name_hu: "text",
  product_detail: "text",
  product_detail_hu: "text",
  product_location: "text",
  product_location_hu: "text"
});

module.exports = mongoose.model("Product", productSchema);