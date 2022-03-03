const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const prodSchema = new mongoose.Schema({
  productID: {
    type: Number, 
    minlength: 5,
    maxlength: 15,
    default:3223423
  },
  title: {
    type: String,
    required: true, 
    maxlength: 50,
    unique:true
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String, 
    maxlength: 255,
    required: true,
  },
  category: {
     type:mongoose.Schema.Types.ObjectId,
     ref: 'Category'
  },
  quantityInStock: {
    type: Number,
    required: true,
  },
});
const Product = mongoose.model("Product", prodSchema);
exports.Product = Product;
