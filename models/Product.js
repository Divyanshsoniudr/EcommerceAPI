const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, // product title, required and unique
    desc: { type: String, required: true, unique: true }, // product description, required and unique
    img: { type: String, required: true }, // product image url, required
    categories: { type: Array }, // product categories, an array of strings
    size: { type: Array }, // product size, a string
    color: { type: Array }, // product color, a string
    price: { type: Number, required: true }, // product price, a number and required
    inStock:{type:Boolean, default: true},
  
  },
  { timestamps: true } // include timestamps in the schema
);

module.exports = mongoose.model("Product", ProductSchema); // export the model with the schema
