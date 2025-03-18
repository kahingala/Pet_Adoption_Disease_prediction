import { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { motion } from "framer-motion";

const campaigns = ["Medical Fund", "Vet Clinic", "Animal Shelter", "Food for Strays"];

const DonationForm = () => {
  const [donation, setDonation] = useState({ name: "", amount: "", campaign: "" });

  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert(`Thank you ${donation.name} for donating $${donation.amount} to ${donation.campaign}!`);
    setDonation({ name: "", amount: "", campaign: "" });
  };

  return (
    <Box component={motion.div} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} 
      sx={{ p: 3, mb: 4, boxShadow: 5, borderRadius: 3, background: "#FFF3E0" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Donate Now</Typography>
      <TextField fullWidth label="Your Name" name="name" value={donation.name} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Amount ($)" name="amount" type="number" value={donation.amount} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth select label="Select Campaign" name="campaign" value={donation.campaign} onChange={handleChange} sx={{ mb: 2 }}>
        {campaigns.map((camp, index) => (
          <MenuItem key={index} value={camp}>{camp}</MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>Donate</Button>
    </Box>
  );
};

export default DonationForm;
