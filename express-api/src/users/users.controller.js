const express = require("express");
const { createUser } = require("./users.service");

const router = express.Router();

router.post("/", createUser);

module.exports = router;
