import { Box, Card, CardContent, Typography } from "@mui/material";

const topDonors = [
  { name: "Jane Doe", amount: 500 },
  { name: "Michael Lee", amount: 350 },
];

const TopDonors = () => {
  return (
    <Box sx={{ p: 3, mb: 4, boxShadow: 5, borderRadius: 3, background: "#FFEBEE" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color:"GrayText" }}>🏆 Top Donors</Typography>
      {topDonors.map((donor, index) => (
        <Card key={index} sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">{donor.name}</Typography>
            <Typography variant="body2">Donated: ${donor.amount}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TopDonors;
