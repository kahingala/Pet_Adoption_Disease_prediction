import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Collapse, Button, ButtonGroup } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api'; // Adjust the path if needed
import { format } from 'date-fns';
import { Alert } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material'; // Import icons

const SortedDonationHistory = () => {
    const [historyType, setHistoryType] = useState('total');
    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({}); // Track expanded groups

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/donations/sorted`);
        setData(response.data[0]);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch donation history.');
        setLoading(false);
      }
    };

    fetchDonationHistory();
  }, []);

  const toggleGroupExpansion = (groupKey) => {
    setExpandedGroups((prevExpanded) => ({
      ...prevExpanded,
      [groupKey]: !prevExpanded[groupKey],
    }));
  };

  const renderTotalDonations = () => {
    if (!data) return null;

    return (
      <>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Total Donations
        </Typography>
        <Card sx={{ mb: 4, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Total Amount: ${data.totalAmount}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              Number of Donations: {data.totalCount}
            </Typography>
          </CardContent>
        </Card>
        {data.donations?.map((donation) => (
          <Card key={donation._id} sx={{ mb: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Donation ID: {donation.transactionId}
               
              </Typography>
              <Typography>
                Campaign: {donation.campaignId ? donation.campaign.title : 'N/A'}
              </Typography>
              <Typography>Amount: ${donation.amount}</Typography>
              <Typography>Name: {donation.name}</Typography>
              <Typography>
                Date: {format(new Date(donation.donationDate), 'PPPppp')}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </>
    );
  };

  const renderGroupedDonations = () => {
    if (!data) return null;
    const groupedData = groupData(data.donations);
    

    return (
      <>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Donation History 
        </Typography> 
        {groupedData?.map((group) => {
          const groupKey = `${group._id.campaignName}-${group._id.campaignCategory}`;
          return (
            <Card key={groupKey} sx={{ mb: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Campaign: {group._id.campaignName}
                  
                </Typography>
                <Typography variant="subtitle1">
                  Category: {group._id.campaignCategory}
                </Typography>
                <Typography>Total Amount: ${group.totalAmount.toFixed(2)}</Typography>
                <Button
                  onClick={() => toggleGroupExpansion(groupKey)}
                  aria-expanded={expandedGroups[groupKey] || false}
                  sx={{ mt: 1 }}
                >
                  {expandedGroups[groupKey] ? (
                    <>
                      <ExpandLess />
                      Hide Donations
                    </>
                  ) : (
                    <>
                      <ExpandMore />
                      Show Donations
                    </>
                  )}
                </Button>
                <Collapse in={expandedGroups[groupKey] || false} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 2 }}>
                    {group.donations.map((donation) => (
                      <Card key={donation._id} sx={{ mb: 1, boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
                        <CardContent>
                          <Typography variant="body2" fontWeight="bold">
                            Donation ID: {donation.transactionId}
                          </Typography>
                          <Typography variant="body2">Name: {donation.name}</Typography>
                          <Typography variant="body2">
                            Amount: ${donation.amount}
                          </Typography>
                          <Typography variant="body2">
                            Date: {format(new Date(donation.donationDate), 'PPPppp')}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          );
        })}
      </>
    );
  };

  const groupData = (donations) => {
    const grouped = {};
    donations?.forEach((donation) => {
      const campaignName = donation.campaignId?.title || 'N/A';
      const campaignCategory = donation.campaignId?.category || 'N/A';
      const key = `${campaignName}-${campaignCategory}`;
      if (!grouped[key]) {
        grouped[key] = {
          _id: { campaignName, campaignCategory },
          donations: [],
          totalAmount: 0,
        };
      }
      grouped[key].donations.push(donation);
      grouped[key].totalAmount += donation.amount;
    });
    return Object.values(grouped);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Donation History...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <ButtonGroup variant="contained" sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          onClick={() => setHistoryType('total')}
          variant={historyType === 'total' ? 'contained' : 'outlined'}
        >
          Total Donations
        </Button>
        <Button
          onClick={() => setHistoryType('grouped')}
          variant={historyType === 'grouped' ? 'contained' : 'outlined'}
        >
          Grouped Donations
        </Button>
      </ButtonGroup>
      {historyType === 'total' && renderTotalDonations()}
      {historyType === 'grouped' && renderGroupedDonations()}
    </Box>
  );
};

export default SortedDonationHistory;