// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://seth:sethmongo123@cluster0.yzm6vxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      dbName: "pet",
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

async function closeDatabaseConnection() {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB Atlas (Mongoose)');
}

module.exports = {connectDB, closeDatabaseConnection};