const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const CategoryRoute = require('./src/category/CategoryRout');
const morgan = require('morgan');
const cors = require('cors');

// Create Express app
const app = express();

app.use(cors());

app.use(morgan('dev'));

dotenv.config({path:"config.env"})
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://category-mongodb:27017/categorydb")

  .then(() => {
    console.log("Connected to MongoDB");
    
    // Define a route for the home page
    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });


    app.use('/category',CategoryRoute);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));