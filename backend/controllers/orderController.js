const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// Create Order
exports.create = async (req, res) => {
  try {
    console.log(req.body.adtoys);
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(
      expectedDeliveryDate.getDate() + 5
    );

    const order = await Order.create({
      ...req.body,
      user: req.user._id,
      expectedDeliveryDate,
    });

    for (const item of req.body.items || []) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// User Orders
exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Admin Orders
exports.adminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Update Order Status
exports.updateStatus = async (req, res) => {
  try {
    const status =
      req.body.orderStatus || req.body.status;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: status,
        deliveryStatus: status,
      },
      {
        new: true,
      }
    );

    res.json(order);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Dashboard Summary
exports.summary = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const orders = await Order.find();

    const todayOrders = orders.filter(
      (o) => o.createdAt >= start
    );

    const totalIncome = orders.reduce(
      (sum, order) => sum + (order.amount || 0),
      0
    );

    res.json({
      todayTotalOrders: todayOrders.length,
      totalIncome,
      totalProducts: await Product.countDocuments(),
      totalUsers: await User.countDocuments(),

      pendingOrders: orders.filter(
        (o) =>
          !["Delivered", "Cancelled"].includes(
            o.orderStatus
          )
      ).length,

      deliveredOrders: orders.filter(
        (o) => o.orderStatus === "Delivered"
      ).length,

      cancelledOrders: orders.filter(
        (o) => o.orderStatus === "Cancelled"
      ).length,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product");

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

exports.getAdminOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel Order (User)
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.orderStatus !== "Order Placed" &&
      order.orderStatus !== "Processing"
    ) {
      return res.status(400).json({
        message:
          "This order cannot be cancelled.",
      });
    }
    const { cancelReason, cancelNote } = req.body;

order.cancelReason = cancelReason || "";
order.cancelNote = cancelNote || "";
order.cancelledAt = new Date();

    order.orderStatus = "Cancelled";
    order.deliveryStatus = "Cancelled";

    await order.save();

    // Restore Product Stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: item.quantity,
          },
        }
      );
    }

    res.json({
      message: "Order cancelled successfully.",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};