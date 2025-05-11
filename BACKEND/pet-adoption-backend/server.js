const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ⬅️ Needed to serve static files
require('dotenv').config();

const petRoutes = require('./routes/pets');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically (e.g., http://localhost:5000/uploads/filename.jpg)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/pets', petRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));
