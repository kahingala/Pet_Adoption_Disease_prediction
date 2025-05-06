import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api'; // Adjust the path if needed
import { format } from 'date-fns';
import { Alert } from '@mui/material';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/donations/history`); // Use the correct endpoint
        setDonations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch donation history.');
        setLoading(false);
      }
    };

    fetchDonationHistory();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Donation History...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!donations || donations.length === 0) {
    return (
      <Typography sx={{ textAlign: 'center', py: 2 }}>No donations found in history.</Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Donation History</Typography>
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
              Name: {donation.name}
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

export default DonationHistory;
