const r = require("express").Router();
const c = require("../controllers/authController");
const { protect } = require("../middleware/auth");

r.post("/register", c.register);
r.post("/login", c.login);

r.put("/profile", protect, c.updateProfile);
r.post(
  "/change-password",
  protect,
  c.changePassword
);

module.exports = r;