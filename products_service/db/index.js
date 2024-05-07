const mongoose = require("mongoose");

mongoose
  .connect("mongodb://products-mongodb:27017/productsdb", { useNewUrlParser: true })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
