const mongoose = require("mongoose");

// defining the schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["milk", "vegetable", "lelntils", "food"],
  },
});

// Ceating a model:
const Product = mongoose.model("Product", productSchema);

// Importing the model:
module.exports = Product;
