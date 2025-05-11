// index.js
const express = require('express');
const bodyParser = require('body-parser');
//const dotenv = require('dotenv');
const cors = require('cors'); 
const {connectDB, closeDatabaseConnection } = require('./config/database');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
//const userRoutes = require('./routes/userRoutes');
//const adminRoutes = require('./routes/adminRoutes');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');


// Load environment variables
//dotenv.config();
// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

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


// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where images will be stored
    cb(null, 'uploads/'); // Create an 'uploads' folder in your project directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename (e.g., timestamp + original name)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create the 'uploads' directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Route to handle image uploads
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  // req.file.filename contains the generated filename
  const imageUrl = `Backend/uploads/${req.file.filename}`; // Construct the image URL

  res.json({ imageUrl });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Send email route
/*app.post('/api/send-email', async (req, res) => {
  const { email } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'newpico001@gmail.com',
        pass: 'biat echd xdsl mzog',
      },
      tls: {
        
        rejectUnauthorized: false,
    },
      debug: true,
  logger: true
    });

    // Mail options
    const mailOptions = {
      from: "newpico001@gmail.com",
      to: email,
      subject: 'Welcome to our service!',
      text: 'Thanks for signing up. We hope you enjoy your experience!',
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});*/