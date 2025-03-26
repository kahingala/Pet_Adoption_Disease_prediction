// controllers/donationController.js
const Donation = require('../models/donation');
const Campaign = require('../models/campaign');
const User = require('../models/user');

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const { campaignId, amount, paymentMethod, transactionId, userId } = req.body;

    // Basic validation
    if (!campaignId || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Please provide a valid campaignId and a positive donation amount.' });
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }

    const newDonation = await Donation.create({
      campaignId,
      userId, // Associate with user if provided
      amount,
      paymentMethod,
      transactionId,
    });

    // Update campaign's current amount
    campaign.currentAmount += amount;
    await campaign.save();

    // Optionally, associate donation with user's history
    if (userId) {
      await User.findByIdAndUpdate(userId, { $push: { donationHistory: newDonation._id } });
    }

    res.status(201).json({ message: 'Donation successful', donation: newDonation });
  } catch (error) {
    console.error('Error creating donation:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid campaignId or userId format.' });
    }
    res.status(500).json({ message: 'Server error creating donation.' });
  }
};

// Get donation history for a user (Authenticated)
exports.getDonationHistory = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming userId is passed as a query parameter

    if (!userId) {
      return res.status(400).json({ message: 'Please provide userId to view donation history.' });
    }

    const donations = await Donation.find({ userId })
      .populate('campaignId', 'title') // Populate only the title of the campaign
      .sort({ donationDate: -1 });

    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid userId format.' });
    }
    res.status(500).json({ message: 'Server error fetching donation history.' });
  }
};

// Get all donations (Admin) - Optional, for admin overview
exports.getAllDonationsAdmin = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('campaignId', 'title')
      .populate('userId', 'name email')
      .sort({ donationDate: -1 });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching all donations (admin):', error);
    res.status(500).json({ message: 'Server error fetching all donations.' });
  }
};