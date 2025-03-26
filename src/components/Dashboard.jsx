import { Box, Grid, Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { Pets, Store, VolunteerActivism, Healing } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const features = [
  { title: "Adopt a Pet", icon: <Pets sx={{ fontSize: 50, color: "#5D4037" }} />, description: "Find and adopt your perfect pet.", link:"/fundraising" },
  { title: "Shop for Pets", icon: <Store sx={{ fontSize: 50, color: "#5D4037" }} />, description: "Buy pet essentials and accessories." },
  { title: "Donate & Help", icon: <VolunteerActivism sx={{ fontSize: 50, color: "#5D4037" }} />, description: "Support shelters and pet welfare.", link:"/fundraising" },
  { title: "Disease Prediction", icon: <Healing sx={{ fontSize: 50, color: "#5D4037" }} />, description: "Predict pet illnesses based on symptoms." }
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color:"#d7ccc8" }}>
        Pet Adoption & Disease Prediction Dashboard
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
          <ButtonBase 
      onClick={() => navigate(feature.link)} >
            <Card sx={{ p: 2, boxShadow: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardContent>
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
