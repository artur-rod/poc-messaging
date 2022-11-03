const mongoose = require("../libs/database/mongodb");

const orderSchema = new mongoose.Schema({
  product: {
    type: "string",
    required: true,
  },
  price: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
