const express = require("express");
const ordersRoutes = require("./orders/orders.controller");
const usersRoutes = require("./users/users.controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);

app.listen(3000, "", () => {
  console.log("Server a milhão... 🔥");
});
