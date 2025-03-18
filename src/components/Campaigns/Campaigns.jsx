import { useState } from "react";
import { Box, Card, CardContent, Typography, LinearProgress, Button, Grid } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { motion } from "framer-motion";

// Sample campaign data
const initialCampaigns = [
  { id: 1, title: "Medical Fund", description: "Helping pets get medical care", goal: 1000, raised: 700, image: "./pet_medi.jpg" },
  { id: 2, title: "Free Mobile Vet Clinic", description: "Vaccination for stray animals", goal: 2000, raised: 1200, image: "./pet_treat.jpg" },
  { id: 3, title: "Shelter for Abandoned Pets", description: "Providing homes for abandoned pets", goal: 5000, raised: 3500, image: "./pet1.jpg" },
];

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  // Delete a campaign
  const handleDelete = (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  return (
    <Box sx={{ p: 4, textAlign: "center", minHeight: "100vh", background: "#FCE4EC" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "#D81B60", mb: 3 }}>
        🎯 Fundraising Campaigns
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {campaigns.map((campaign) => (
          <Grid item key={campaign.id} xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card sx={{ boxShadow: 5, borderRadius: 3, overflow: "hidden" }}>
                <img src={campaign.image} alt={campaign.title} width="100%" height="150px" style={{ objectFit: "cover" }} />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>{campaign.title}</Typography>
                  <Typography variant="body2" sx={{ my: 1 }}>{campaign.description}</Typography>

                  {/* Progress Bar */}
                  <Box sx={{ my: 2 }}>
                    <LinearProgress variant="determinate" value={(campaign.raised / campaign.goal) * 100} />
                    <Typography variant="caption">{`$${campaign.raised} raised of $${campaign.goal}`}</Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Button startIcon={<Edit />} sx={{ color: "#0288D1", mr: 1 }}>Edit</Button>
                  <Button startIcon={<Delete />} sx={{ color: "#D32F2F" }} onClick={() => handleDelete(campaign.id)}>Delete</Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Add New Campaign (Dummy Button for Future Implementation) */}
      <Button variant="contained" startIcon={<Add />} sx={{ mt: 4, background: "#4CAF50", color: "white" }}>
        Add New Campaign
      </Button>
    </Box>
  );
};

export default Campaigns;
