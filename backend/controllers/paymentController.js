const crypto = require("crypto");
const razorpay = require("../config/razorpay");

// Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount) * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  }catch (err) {

  res.status(500).json({
    message: err.message,
  });
}
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const sign = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
          "|" +
          razorpay_payment_id
      )
      .digest("hex");

    if (sign === razorpay_signature) {
      return res.json({
        success: true,
        message: "Payment Verified",
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid Signature",
    });
  } catch (err) {
  console.error("RAZORPAY ERROR:");
  console.error(err);

  res.status(500).json({
    message: err.message,
  });
}
};