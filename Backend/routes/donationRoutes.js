// routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
//const { protect } = require('../middleware/auth');

router.post('/', donationController.createDonation); // Public - anyone can donate
router.get('/history', donationController.getDonationHistory); // Protected
router.get('/admin', donationController.getAllDonationsAdmin); // Admin route (unprotected for now)

module.exports = router;