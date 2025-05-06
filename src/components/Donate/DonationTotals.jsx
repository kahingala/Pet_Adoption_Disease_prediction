import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const DonationTotals = () => {
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationTotals = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/donations/totals`);
        setTotals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donation totals:', error);
        setError(error.message || 'Failed to fetch donation totals.');
        setLoading(false);
      }
    };

    fetchDonationTotals();
  }, []);

  if (loading) {
    return <Typography>Loading donation totals...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (totals.length === 0) {
    return <Typography>No donations found.</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Donation Totals by User</Typography>
      {totals.map((userTotal) => (
        <Card key={userTotal._id} sx={{ mb: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              User: {userTotal._id}
            </Typography>
            <Typography>
              Total Amount: ${userTotal.totalAmount}
            </Typography>
             <Typography>
              Number of Donations: {userTotal.count}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DonationTotals;