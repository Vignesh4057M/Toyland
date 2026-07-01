const mongoose = require("mongoose");

const toyCategories = [
  "Educational Toys",
  "Action Figures",
  "Building Blocks",
  "Soft Toys",
  "Baby Toys",
  "Outdoor Toys",
  "Puzzle Toys",
  "Remote Control Toys",
];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mainCategory: { type: String, enum: toyCategories, required: true },
    subCategory: { type: String, trim: true },
    price: { type: Number, required: true },
    discountPrice: Number,
    about: String,
    description: String,
    sizes: [String],
    colors: [String],
    stock: { type: Number, default: 0 },
    images: [String],
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
module.exports.toyCategories = toyCategories;
