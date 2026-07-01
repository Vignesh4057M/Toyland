const router = require("express").Router();

const {
  getMyAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} = require("../controllers/addressController");

const {
  protect,
} = require("../middleware/auth");

router.get(
  "/",
  protect,
  getMyAddresses
);

router.post(
  "/",
  protect,
  addAddress
);

router.put(
  "/:id",
  protect,
  updateAddress
);

router.delete(
  "/:id",
  protect,
  deleteAddress
);
router.put(
  "/default/:id",
  protect,
  setDefaultAddress
);

module.exports = router;