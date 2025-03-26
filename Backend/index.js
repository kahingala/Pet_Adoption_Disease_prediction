// index.js
const express = require('express');
const bodyParser = require('body-parser');
//const dotenv = require('dotenv');
const {connectDB, closeDatabaseConnection } = require('./config/database');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
//const userRoutes = require('./routes/userRoutes');
//const adminRoutes = require('./routes/adminRoutes');

// Load environment variables
//dotenv.config();
// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);
//app.use('/api/users', userRoutes);
//app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await closeDatabaseConnection();
  process.exit(0);
});
