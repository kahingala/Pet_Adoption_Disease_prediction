const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

require('dotenv').config(); // Load dotenv at the beginning

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3000"], // Allow both 4000 and 3000 for frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Success!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes

const petRouter = require("./routes/Pets.js"); // Added pet routes


app.use("/Pets", petRouter); // Added pet route

// Start Server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
