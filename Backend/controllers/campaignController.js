// controllers/campaignController.js
const Campaign = require('../models/campaign');

// Create a new campaign (Admin)
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, images, goalAmount, startDate, endDate, category } = req.body;

    if (!title || !description || !goalAmount || !category) {
      return res.status(400).json({ message: 'Please provide title, description, goalAmount, and category.' });
    }

    // Basic date validation (you might want more robust validation)
    if (startDate && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ message: 'Invalid startDate format.' });
    }
    if (endDate && isNaN(Date.parse(endDate))) {
      return res.status(400).json({ message: 'Invalid endDate format.' });
    }
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: 'startDate must be before endDate.' });
    }

    const newCampaign = await Campaign.create({
      title,
      description,
      images: images || [],
      goalAmount,
      startDate,
      endDate,
      category,
    });

    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Server error creating campaign.' });
  }
};

// Get all active campaigns
exports.getAllActiveCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: 'active' })
      .sort({ createdAt: -1 }); // Sort by most recent
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching active campaigns:', error);
    res.status(500).json({ message: 'Server error fetching campaigns.' });
  }
};

// Get a specific campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign by ID:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid campaign ID format.' });
    }
    res.status(500).json({ message: 'Server error fetching campaign.' });
  }
};

// Update a campaign (Admin)
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }

    const { title, description, images, goalAmount, startDate, endDate, category, status } = req.body;

    if (startDate && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ message: 'Invalid startDate format.' });
    }
    if (endDate && isNaN(Date.parse(endDate))) {
      return res.status(400).json({ message: 'Invalid endDate format.' });
    }
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: 'startDate must be before endDate.' });
    }

    campaign.title = title || campaign.title;
    campaign.description = description || campaign.description;
    campaign.images = images || campaign.images;
    campaign.goalAmount = goalAmount || campaign.goalAmount;
    campaign.startDate = startDate || campaign.startDate;
    campaign.endDate = endDate || campaign.endDate;
    campaign.category = category || campaign.category;
    campaign.status = status || campaign.status;
    campaign.updatedAt = Date.now();

    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid campaign ID format.' });
    }
    res.status(500).json({ message: 'Server error updating campaign.' });
  }
};

// Delete a campaign (Admin)
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }

    res.json({ message: 'Campaign deleted successfully.' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid campaign ID format.' });
    }
    res.status(500).json({ message: 'Server error deleting campaign.' });
  }
};

// Get all campaigns (Admin)
exports.getAllCampaignsAdmin = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching all campaigns (admin):', error);
    res.status(500).json({ message: 'Server error fetching campaigns.' });
  }
};

// Get the progress of a specific campaign
exports.getCampaignProgress = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).select('goalAmount currentAmount');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }

    const { goalAmount, currentAmount } = campaign;
    const progress = goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;
    const remaining = goalAmount - currentAmount;

    res.json({
      goalAmount,
      currentAmount,
      progress: parseFloat(progress.toFixed(2)), // Format to 2 decimal places
      remaining,
    });
  } catch (error) {
    console.error('Error fetching campaign progress:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid campaign ID format.' });
    }
    res.status(500).json({ message: 'Server error fetching campaign progress.' });
  }
};