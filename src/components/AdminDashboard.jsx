// src/pages/AdminDashboard.js
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Button component={Link} to="/admin/campaigns/create" variant="contained" color="primary">
          Create New Campaign
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Manage Campaigns
      </Typography>
      {/* Add links or components to view/edit/delete campaigns here */}
      <Button component={Link} to="/admin/campaigns" variant="outlined">
        View All Campaigns
      </Button>
    </Box>
  );
};

export default AdminDashboard;