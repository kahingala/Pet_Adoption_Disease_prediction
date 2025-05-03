import { useState,useEffect } from "react";
import { Box, TextField, Button, MenuItem, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import CampaignDetails from "../Campaigns/CampaignDetails";
import CampaignCard from "../Campaigns/CampaignCard";

const campaigns = ["Medical Fund", "Vet Clinic", "Animal Shelter", "Food for Strays"];

const DonationForm = () => {
  const { campaignId } = useParams()
  const [donation, setDonation] = useState({ name: "", amount: "", campaign: campaignId || "" });
  const [amountError, setAmountError] = useState("");
  const [nameError, setNameError] = useState("");
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/campaigns/${campaignId}`);
        console.log(response);
        setCampaignData(response.data);
        
      } catch (err) {
        console.log(err.message || 'Failed to fetch campaign details.');
        
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
    if (e.target.name === "amount") {
      setAmountError("");
    } else if (e.target.name === "name") {
      setNameError("");
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
      alert(`Thank you ${donation.name} for donating $${donation.amount} to ${donation.campaign}!`);
      setDonation({ name: "", amount: "", campaign: campaignId || "" });
    }
  };

  return (
    <>
    <Card sx={{ width: "345px", margin: 2, borderRadius: 2,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    }, }}>
    {campaignData.images && campaignData.images.length > 0 && (
      <img
            src={campaignData.images[0] }
            alt={campaignData.title}
            width="100%" height="150px"
            style={{ objectFit: "cover" }}
          />
    )}
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
        {campaignData.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxHeight: 100, overflow:'scroll','::-webkit-scrollbar': {
        display: 'none',
      }, textOverflow: 'ellipsis' }}>
        {campaignData.description}
      </Typography>
      <ProgressIndicator current={campaignData.currentAmount} goal={campaignData.goalAmount} />
      </CardContent>
    </Card>
    <Box component={motion.div} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} 
      sx={{ p: 3, mb: 4, boxShadow: 5, borderRadius: 3, background: "#FFF3E0" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color:"brown" }}>Donate Now</Typography>
      <TextField fullWidth label="Your Name" name="name" value={donation.name} onChange={handleChange}  error={!!nameError}
       helperText={nameError} sx={{ mb: 2 }} />
      <TextField fullWidth label="Amount ($)" name="amount" type="number" value={donation.amount} onChange={handleChange} error={!!amountError}
        helperText={amountError} sx={{ mb: 2 }} />
      <TextField fullWidth select label="Select Campaign" name="campaign" value={donation.campaign} onChange={handleChange} sx={{ mb: 2 }}>
        {campaigns.map((camp, index) => (
          <MenuItem key={index} value={camp}>{camp}</MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>Donate</Button>
    </Box>
    </>
  );
  
};

export default DonationForm;
