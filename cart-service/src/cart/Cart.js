const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
