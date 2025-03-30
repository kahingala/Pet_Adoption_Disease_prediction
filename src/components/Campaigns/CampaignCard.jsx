// src/components/CampaignCard.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from './ProgressIndicator';
import DeleteCampaign from './DeleteCampaign'; // Import the component
import { deleteCampaign, fetchCampaigns } from '../../Redux/campaignActions';
import { useDispatch } from 'react-redux';
import { Add, Delete, Edit } from "@mui/icons-material";
const CampaignCard = ({ campaign }) => {
  
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/campaigns/${campaign._id}`);
  };
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteClick = (campaignId) => {
    setDeleteModal(true);
  };

  const handleCampaignDeleted = () => {
    //dispatch(deleteCampaign(campaign._id));
    dispatch(fetchCampaigns());
    setDeleteModal(false);
  };
  const handleUpdateClick = () => {
    navigate(`/admin/campaigns/edit/${campaign._id}`); // Navigate to edit page
  };

  return (
    
    <Card sx={{ width: "345px", margin: 2, borderRadius: 2,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.02)',
      }, }}>
      {campaign.images && campaign.images.length > 0 && (
        <img
              src={campaign.images[0] }
              alt={campaign.title}
              width="100%" height="150px"
              style={{ objectFit: "cover" }}
            />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
          {campaign.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxHeight: 100, overflow:'scroll','::-webkit-scrollbar': {
          display: 'none',
        }, textOverflow: 'ellipsis' }}>
          {campaign.description}
        </Typography>
        <ProgressIndicator current={campaign.currentAmount} goal={campaign.goalAmount} />
        <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="outlined" onClick={handleViewDetails} size="small">
            View Details
          </Button>
          <Button variant="contained" startIcon={<Edit />} size="small" color="primary" onClick={handleUpdateClick} sx={{ margin: 1 }}>
        Update
      </Button>
          <Button onClick={() => handleDeleteClick(campaign._id)} startIcon={<Delete /> } size="small">Delete</Button>
          {deleteModal && (
        <DeleteCampaign
          campaignId={campaign._id}
          onClose={() => setDeleteModal(false)}
          onDeleteSuccess={handleCampaignDeleted}
        />
      )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;