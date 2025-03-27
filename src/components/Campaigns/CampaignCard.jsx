// src/components/CampaignCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from './ProgressIndicator';

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/campaigns/${campaign._id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {campaign.images && campaign.images.length > 0 && (
        <CardMedia
          component="img"
          height="140"
          image={campaign.images[0]} // Assuming the first image is the main one
          alt={campaign.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {campaign.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {campaign.description}
        </Typography>
        <ProgressIndicator current={campaign.currentAmount} goal={campaign.goalAmount} />
        <Box sx={{ marginTop: 1 }}>
          <Button variant="outlined" onClick={handleViewDetails}>
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;