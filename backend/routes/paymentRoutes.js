const router = require("express").Router();

const paymentController = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

router.post(
  "/create-order",
  protect,
  paymentController.createOrder
);

router.post(
  "/verify",
  protect,
  paymentController.verifyPayment
);

module.exports = router;