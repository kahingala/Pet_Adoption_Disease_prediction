// controllers/donationController.js
const Donation = require('../models/donation');
const Campaign = require('../models/campaign');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const { campaignId, amount, paymentMethod, userId, name } = req.body;

    // Basic validation
    if (!campaignId || !amount || isNaN(amount) || amount <= 0  || !name) {
      return res.status(400).json({ message: 'Please provide a valid campaignId and a positive donation amount.' });
    }

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found.' });
    }
    const transactionId = uuidv4();

    const newDonation = await Donation.create({
      campaignId,
      userId, // Associate with user if provided
      amount,
      paymentMethod,
      transactionId,
      name,
    });

    // Update campaign's current amount
    if (campaign.currentAmount+ amount >= campaign.goalAmount){
      res.status(200).json({ message: 'Donation successful! Campaign goal reached!', donation: newDonation });
               }else{
                campaign.currentAmount += amount;
                await campaign.save();

               }
    

    // Optionally, associate donation with user's history
  //  if (userId) {
   //   await User.findByIdAndUpdate(userId, { $push: { donationHistory: newDonation._id } });
   // }

    res.status(201).json({ message: 'Donation successful', donation: newDonation });
  } catch (error) {
    console.error('Error creating donation:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid campaignId or userId format.' });
    }
    res.status(500).json({ message: 'Server error creating donation.' });
  }
};

// Get donation history for all users (Authenticated)
exports.getDonationHistory = async (req, res) => {
  try {
    
    const donations = await Donation.find()
      .populate('campaignId') // Populate only the title of the campaign
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

exports.getUserDonationHistory = async (req, res) => {
  try {
    const { userName } = req.params; // Get the userName from the URL

    // Find all donations for the userName, sorted by donationDate descending
    const donations = await Donation.find({ name: userName })
      .populate('campaignId')
      .sort({ donationDate: -1 });

    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(500).json({ message: 'Failed to fetch donations.', error: error.message });
  }

}

exports.getTotalDonations = async (req, res) => {
  try {
    // Use aggregation to group donations by userName and sum the amounts
    const totals = await Donation.aggregate([
      {
        $group: {
          _id: '$name', // Group by userName
          totalAmount: { $sum: '$amount' }, // Calculate the sum of amount
          count: { $sum: 1 } //count the number of donations
        },
      },
      {
        $sort: { totalAmount: -1 }, // Sort in descending order of totalAmount
      },
    ]);

    res.status(200).json(totals);
  } catch (error) {
    console.error('Error fetching donation totals:', error);
    res.status(500).json({ message: 'Failed to fetch donation totals.', error: error.message });
  }
}

exports.getSortedDonationHistory = async (req, res) => {
  try {
    const donations = await Donation.aggregate([
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaignId',
          foreignField: '_id',
          as: 'campaign',
        },
      },
      {
        $unwind: '$campaign',
      },
      
        
      {
        $group: {
          _id: {
            campaignName: '$campaign.title',
            campaignCategory: '$campaign.category', // Group by category
          },
          donations: { $push: '$$ROOT' },
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 }
        },
      },
      {
        $sort: { '_id.campaignName': 1, '_id.campaignCategory': 1 }, // Sort by name, then category
      },
    ]).exec();

    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).json({
      message: 'Server error fetching donation history.',
      error: error.message,
    });
  }
}