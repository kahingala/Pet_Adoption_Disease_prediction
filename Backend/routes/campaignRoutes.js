// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
//const { protect } = require('../middleware/auth'); // Assuming you'll create an auth middleware

// Public routes
router.get('/', campaignController.getAllActiveCampaigns);
router.get('/:id', campaignController.getCampaignById);
router.get('/:id/progress', campaignController.getCampaignProgress); // New route for progress


// Admin routes (protected)
router.post('/',  campaignController.createCampaign);
router.put('/:id',  campaignController.updateCampaign);
router.delete('/:id',  campaignController.deleteCampaign);
router.get('/admin', campaignController.getAllCampaignsAdmin);

module.exports = router;