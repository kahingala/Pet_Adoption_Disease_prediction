// src/pages/CampaignList.js
import React, { useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from '../../Redux/campaignActions';
import { selectCampaigns, selectCampaignsLoading, selectCampaignsError } from '../../Redux/campaignSelectors';
import CampaignCard from './CampaignCard';
import { motion } from "framer-motion";
import { Add, Delete, Edit } from "@mui/icons-material";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { useNavigate } from 'react-router-dom';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const CampaignList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campaigns = useSelector(selectCampaigns);
  const loading = useSelector(selectCampaignsLoading);
  const error = useSelector(selectCampaignsError);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  if (loading) return <Typography>Loading campaigns...</Typography>;
  if (error) return <Typography color="error">Error loading campaigns.</Typography>;

  const addNEWcampaign = () => {
    navigate(`/admin/campaigns/create`); // Navigate to edit page
  };
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Fundraising Campaigns
      </Typography>
      <Grid container spacing={3} >
        {campaigns.map((campaign) => (
          <Grid item key={campaign._id} xs={12} sm={6} md={4}>
            <CampaignCard campaign={campaign} />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={()=>addNEWcampaign()} startIcon={<Add />} sx={{ mt: 4, background: "#4CAF50", color: "white" }}>
        Add New Campaign
      </Button>
      <Button variant="contained" onClick={()=> navigate(`/d-history`)} startIcon={<HistoryToggleOffIcon />} sx={{ mt: 4, background: "#4CAF50", color: "white", marginLeft:5 }}>
        Donation History
      </Button>
      <Button variant="contained" onClick={()=> navigate(`/donations/totals`)} startIcon={<CurrencyExchangeIcon />} sx={{ mt: 4, background: "#4CAF50", color: "white", marginLeft:5 }}>
        Total Donations by User
      </Button>
    </Container>
  );
};

export default CampaignList;