const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.on("connected", () => {
  console.log("MongoDB a milhão... 🔥");
});

module.exports = mongoose;
