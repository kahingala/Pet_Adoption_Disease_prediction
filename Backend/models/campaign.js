// models/campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  goalAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  startDate: { type: Date },
  endDate: { type: Date },
  category: { type: String, enum: ['Medical fund', 'Free mobile vet clinic', 'Shelter for abandoned pets', 'Food for stray dogs', 'Animal welfare awareness sessions'] },
  status: { type: String, enum: ['active', 'completed', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Campaign', campaignSchema);