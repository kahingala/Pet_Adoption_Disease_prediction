import { Box, Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

const donations = [
  { id: 1, name: "John Doe", amount: 100, campaign: "Medical Fund", date: "2025-03-01" },
  { id: 2, name: "Alice Smith", amount: 50, campaign: "Animal Shelter", date: "2025-02-28" },
];

const DonationHistory = () => {
  return (
    <Box sx={{ p: 3, mb: 4, boxShadow: 5, borderRadius: 3, background: "#E3F2FD" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 ,color:"GrayText"}}>📜 Donation History</Typography>
      <List>
        {donations.map((donation) => (
          <ListItem key={donation.id}>
            <ListItemText primary={`$${donation.amount} - ${donation.campaign}`} 
                        secondary={`${donation.name} | ${donation.date}`} 
                        primaryTypographyProps={{ style: { color: "#D81B60", fontWeight: "bold" } }}    />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DonationHistory;
