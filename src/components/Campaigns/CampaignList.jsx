// src/pages/CampaignList.js
import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from '../../Redux/campaignActions';
import { selectCampaigns, selectCampaignsLoading, selectCampaignsError } from '../../Redux/campaignSelectors';
import CampaignCard from './CampaignCard';

const CampaignList = () => {
  const dispatch = useDispatch();
  const campaigns = useSelector(selectCampaigns);
  const loading = useSelector(selectCampaignsLoading);
  const error = useSelector(selectCampaignsError);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  if (loading) return <Typography>Loading campaigns...</Typography>;
  if (error) return <Typography color="error">Error loading campaigns.</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Fundraising Campaigns
      </Typography>
      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item key={campaign._id} xs={12} sm={6} md={4}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CampaignList;