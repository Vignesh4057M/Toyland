const r = require("express").Router();
const c = require("../controllers/orderController");
const { protect, adminProtect } = require("../middleware/auth");

// User
r.post("/", protect, c.create);

r.get("/my-orders", protect, c.myOrders);

r.get("/:id", protect, c.getOrderById);

r.put("/:id/cancel", protect, c.cancelOrder);

// Admin
r.get(
  "/admin-orders",
  adminProtect,
  c.adminOrders
);

r.put(
  "/:id/status",
  adminProtect,
  c.updateStatus
);

r.get(
  "/summary",
  adminProtect,
  c.summary
);
r.get(
  "/admin/orders/:id",
  adminProtect,
  c.getAdminOrderById
);
module.exports = r;