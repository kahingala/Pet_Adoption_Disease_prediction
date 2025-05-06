// models/donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
 // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: if users are tracked
  amount: { type: Number, required: true },
  donationDate: { type: Date, default: Date.now },
  paymentMethod: { type: String }, // e.g., 'Card', 'Mobile Money' (you'll need to define this based on your payment gateway)
  transactionId: { type: String, unique: true }, // From the payment gateway
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);