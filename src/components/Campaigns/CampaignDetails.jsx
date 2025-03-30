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
    <br/>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {campaign.title}
      </Typography>
      <br/>
      {campaign.images && campaign.images.length > 0 && (
        <>
        {console.log('Image URL:', campaign.images[0])}
    {console.log('CardMedia rendered')}
    <img src={`../${campaign.images[0]}`}  alt={campaign.title} style={{ maxWidth: '800px',display: 'block',  margin: '0 auto' }} />
     </> )}
     <br/>
      <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
      <br/>
        {campaign.description}
      </Typography>
      <Box sx={{ marginBottom: 2, textAlign: 'center' }}>
        <Typography variant="subtitle1" fontWeight="bold">Category: {campaign.category}</Typography>
        {campaign.startDate && (
          <Typography variant="subtitle1">Start Date: {new Date(campaign.startDate).toLocaleDateString()}</Typography>
        )}
        {campaign.endDate && (
          <Typography variant="subtitle1">End Date: {new Date(campaign.endDate).toLocaleDateString()}</Typography>
        )}
      </Box>
      <br/>
      <Box sx={{
      width: '100%',
      marginTop: 1,
      backgroundColor: '#f0f0f0', // Light background color for the Box
      padding: 2, // Optional: Add padding for spacing
      borderRadius: 4, // Optional: Add rounded corners to the Box
    }}>
      <ProgressIndicator current={campaign.currentAmount} goal={campaign.goalAmount} />
      </Box>
      
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center',}}>
      
        <Button variant="contained" color="primary" sx={{ marginTop:2 }}>
        
          Donate Now
        </Button>
      </Box>
    </Box>
  );
};

export default CampaignDetails;