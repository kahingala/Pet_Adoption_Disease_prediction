// src/components/CampaignDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Card, CardContent, CardMedia, Button } from '@mui/material';
import axios from 'axios';
import ProgressIndicator from './ProgressIndicator';
import { API_BASE_URL } from '../../api'; // Assuming you'll have this

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/campaigns/${id}`);
        setCampaign(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch campaign details.');
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) return <Typography>Loading campaign details...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!campaign) return <Typography>Campaign not found.</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {campaign.title}
      </Typography>
      {campaign.images && campaign.images.length > 0 && (
        <CardMedia
          component="img"
          sx={{ height: 200, marginBottom: 2 }}
          image={campaign.images[0]}
          alt={campaign.title}
        />
      )}
      <Typography variant="body1" paragraph>
        {campaign.description}
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1">Category: {campaign.category}</Typography>
        {campaign.startDate && (
          <Typography variant="subtitle1">Start Date: {new Date(campaign.startDate).toLocaleDateString()}</Typography>
        )}
        {campaign.endDate && (
          <Typography variant="subtitle1">End Date: {new Date(campaign.endDate).toLocaleDateString()}</Typography>
        )}
      </Box>
      <ProgressIndicator current={campaign.currentAmount} goal={campaign.goalAmount} />
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary">
          Donate Now
        </Button>
      </Box>
    </Box>
  );
};

export default CampaignDetails;