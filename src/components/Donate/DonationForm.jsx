import React, { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import CampaignDetails from "../Campaigns/CampaignDetails";
import CampaignCard from "../Campaigns/CampaignCard";
import ProgressIndicator from "../Campaigns/ProgressIndicator";
import { useNavigate } from 'react-router-dom';


const campaigns = ["Medical Fund", "Vet Clinic", "Animal Shelter", "Food for Strays"];

const DonationForm = () => {
  console.log("DonationForm component rendered");
  const {campaignId} = useParams();
  console.log("campaignId before useEffect:", campaignId);
  const [campaignData, setCampaignData] = useState(null);
  const [donation, setDonation] = useState({ name: "", amount: "", campaign: campaignId || "" });
  const [amountError, setAmountError] = useState("");
  const [nameError, setNameError] = useState("");
 
  const navigate = useNavigate();


  const fetchCampaign = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/campaigns/${campaignId}`);
      console.log(response);
      setCampaignData(response.data);
      
    } catch (err) {
      console.log(err.message || 'Failed to fetch campaign details.');
      
    }
  };
useEffect(() => {
    console.log("useEffect triggered, campaignId:", campaignId);
   
    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
    if (e.target.name === "amount") {
      setAmountError("");
    } else if (e.target.name === "name") {
      setNameError("");
    }
  };

  const handleAmountSelect = (percentage) => {
    if (campaignData && campaignData.goalAmount) {
      const reamount = campaignData.goalAmount - campaignData.currentAmount
      const amount = Math.round((reamount * percentage) / 100);
      setDonation({ ...donation, amount: amount.toString() });
      setAmountError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    // Basic validation
    if (!donation.amount || isNaN(donation.amount) || parseFloat(donation.amount) <= 0) {
      setAmountError("Please enter a valid donation amount.");
      isValid = false;
    } else {
      setAmountError("");
    }

    if (!donation.name.trim()) {
      setNameError("Please enter your name.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (isValid) {
      console.log("Submitting donation data:");
    console.log("Name:", donation.name);
    console.log("Amount:", donation.amount);
    console.log("Campaign ID:", campaignId);
    console.log("Selected Campaign (if no ID):", donation.campaign);
      try {
        const response = await axios.post(`${API_BASE_URL}/api/donations`, {
          name: donation.name,
          amount: parseFloat(donation.amount),
          campaignId: campaignId || donation.campaign // Send the campaign ID
        });
        console.log("transID:", response.data.donation.transactionId);
      alert(`Thank you ${donation.name} for donating $${donation.amount} to ${donation.campaign}!  Your Transaction ID is: ${response.data.donation.transactionId}`);
      fetchCampaign();
      setDonation({ name: "", amount: "", campaign: campaignId || "" });
      navigate('/campaignlist');
    } catch (error) {
      console.error('Error submitting donation:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'Failed to submit donation. Please try again.');
    }
    }
  };

  return (
    <>
      {campaignData && (
        <Card sx={{
          width: "100%",
          maxWidth: 400,
          margin: '10px auto 20px',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" fontWeight="bold" textAlign="center">
              {campaignData.title}
            </Typography>
            {campaignData.images && campaignData.images.length > 0 && (
              <img src={`../${campaignData.images[0]}`}  alt={campaignData.title} style={{ maxWidth: '100%',display: 'block',maxHeight: '500px',   margin: '0 auto', borderRadius: '8px'  }} />
      )}<br/>
            <Typography variant="body2" color="text.secondary" sx={{
              maxHeight: 100,
              overflow: 'auto',
              '::-webkit-scrollbar': { display: 'none' },
              textOverflow: 'ellipsis',
              textAlign: 'center',
              mb: 1
            }}>
              {campaignData.description}
            </Typography>
            {campaignData.goalAmount && (
              <ProgressIndicator current={campaignData.currentAmount} goal={campaignData.goalAmount} />
            )}
          </CardContent>
        </Card>
      )}

      <Box component={motion.div} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
        sx={{ p: 3, mb: 4, boxShadow: 5, borderRadius: 3, background: "#FFF3E0", maxWidth: 400, margin: '10px auto 52px' }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "brown", textAlign: 'center' }}>Donate Now</Typography>
        <TextField
          fullWidth
          label="Your Name"
          name="name"
          value={donation.name}
          onChange={handleChange}
          error={!!nameError}
          helperText={nameError}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Amount ($)"
          name="amount"
          type="number"
          value={donation.amount}
          onChange={handleChange}
          error={!!amountError}
          helperText={amountError}
          sx={{ mb: 2 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={() => handleAmountSelect(25)}
          style={{ flex: 1, marginRight: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
        >
          25%
        </button>
        <button
          type="button"
          onClick={() => handleAmountSelect(50)}
          style={{ flex: 1, marginRight: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
        >
          50%
        </button>
        <button
          type="button"
          onClick={() => handleAmountSelect(75)}
          style={{ flex: 1, marginRight: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
        >
          75%
        </button>
        <button
          type="button"
          onClick={() => handleAmountSelect(100)}
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', flex: 1 }}
        >
          100%
        </button>
      </div>
        
        <TextField
          fullWidth
          
          label={campaignData? " " :"Campaign"}
          name="campaign"
          
          value={campaignData?.category}
          onChange={handleChange}
          sx={{ mb: 2 }}
          disabled={campaignId}
        >
          
        </TextField>
        <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>Donate</Button>
      </Box>
    </>
  );
          }

export default DonationForm;
