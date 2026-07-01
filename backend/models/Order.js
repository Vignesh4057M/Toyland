const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        color: String,
        image: String,
      },
    ],

    adtoys: {
      fullName: String,
      phone: String,
      alternatePhone: String,
      address: String,
      city: String,
      district: String,
      state: String,
      pincode: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    expectedDeliveryDate: {
      type: Date,
    },

    paymentMethod: {
      type: String,
      enum: ["Razorpay", "Cash on Delivery"],
      default: "Cash on Delivery",
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    orderStatus: {
      type: String,
      enum: [
        "Order Placed",
        "Processing",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Placed",
    },

    deliveryStatus: {
      type: String,
      enum: [
        "Order Placed",
        "Processing",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Placed",
    },

    // Cancellation Details
    cancelReason: {
      type: String,
      default: "",
    },

    cancelNote: {
      type: String,
      default: "",
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);