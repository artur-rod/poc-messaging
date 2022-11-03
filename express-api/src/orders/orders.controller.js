const express = require("express");
const { createOrder } = require("./orders.service");

const router = express.Router();

router.post("/", createOrder);

module.exports = router;
