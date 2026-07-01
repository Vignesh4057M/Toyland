const Address = require("../models/Address");

exports.getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user._id,
    }).sort("-createdAt");

    res.json(addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const address =
      await Address.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        req.body,
        {
          new: true,
        }
      );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const address =
      await Address.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    res.json({
      message:
        "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );

    const address =
      await Address.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        {
          isDefault: true,
        },
        {
          new: true,
        }
      );

    res.json(address);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};