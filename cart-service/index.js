const express = require("express");
const mongoose = require("mongoose");
process.loadEnvFile(".env");
const cartRouter = require("./src/cart/CartRouter");
const cors = require('cors');


// Create Express app
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://cart-mongodb:27017/cartdb")

  .then(() => {
    console.log("Connected to MongoDB");

    // Define a route for the home page
    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    // Use the cart router
    app.use("/cart", cartRouter);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));
