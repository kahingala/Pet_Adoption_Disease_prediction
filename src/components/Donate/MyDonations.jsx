import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom'; // Import useParams

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userName } = useParams(); // Get userName from URL

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/donations/my-donations/${userName}`); // Use userName
        setDonations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setError(error.message || 'Failed to fetch donations.');
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, [userName]); // Depend on userName

  if (loading) {
    return <Typography>Loading your donation history...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (donations.length === 0) {
    return <Typography>No donations found for user: {userName}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Donations done User: {userName}
      </Typography>
      {donations.map((donation) => (
        <Card key={donation._id} sx={{ mb: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Donation ID: {donation.transactionId}
            </Typography>
            <Typography>
              Campaign: {donation.campaignId ? donation.campaignId.title : 'N/A'}
            </Typography>
            <Typography>
              Amount: ${donation.amount}
            </Typography>
            <Typography>
              Date: {format(new Date(donation.donationDate), 'PPPppp')}
            </Typography>
            {/* Add more details as needed */}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyDonations;