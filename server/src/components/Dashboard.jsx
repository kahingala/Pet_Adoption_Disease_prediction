import React from 'react';
import { Box, Typography, Grid, Card, Button, List, ListItem, ListItemText } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const adoptionData = [
    { date: 'Jan', adoptions: 20 },
    { date: 'Feb', adoptions: 35 },
    { date: 'Mar', adoptions: 40 },
    { date: 'Apr', adoptions: 50 },
    { date: 'May', adoptions: 60 },
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Header/Title Section */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#000', textAlign: 'center' }}>
        Welcome to Your Dashboard
      </Typography>

      {/* Quick Stats or Overview Cards */}
      <Grid container spacing={4}>
        {[
          { label: 'Total Adoptions', value: 120 },
          { label: 'Items in Shop', value: 50 },
          { label: 'Donations Received', value: '$500' },
          { label: 'Pending Requests', value: 15 }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 3, backgroundColor: '#f5f5f5', boxShadow: 3, borderRadius: 2, '&:hover': { boxShadow: 6 } }}>
              <Typography variant="h6" sx={{ color: '#000' }}>{stat.label}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000' }}>{stat.value}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>Recent Activity</Typography>
        <List sx={{ backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          {[
            { text: 'John Doe adopted a cat', time: '2 hours ago' },
            { text: 'Sarah donated $100', time: '5 hours ago' },
            { text: 'A new pet was added', time: '1 day ago' }
          ].map((activity, index) => (
            <ListItem key={index} sx={{ '&:hover': { backgroundColor: '#eee' } }}>
              <ListItemText primary={activity.text} secondary={activity.time} sx={{ color: '#000' }} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Graphs or Data Visualizations */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>Adoption Trends</Typography>
        <LineChart width={600} height={350} data={adoptionData}>
          <Line type="monotone" dataKey="adoptions" stroke="#ff6f61" />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Legend />
        </LineChart>
      </Box>

      {/* Quick Actions */}
      <Box sx={{ mt: 4, display: 'flex', gap: 3 }}>
        {[
          { label: 'Add New Pet', color: 'primary' },
          { label: 'View Donations', color: 'secondary' },
          { label: 'Manage Users', color: 'success' }
        ].map((action, index) => (
          <Button
            key={index}
            variant="contained"
            color={action.color}
            sx={{ flexGrow: 1, textTransform: 'none', boxShadow: 2, '&:hover': { boxShadow: 6 } }}
          >
            {action.label}
          </Button>
        ))}
      </Box>

      {/* Notifications */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>Notifications</Typography>
        <Box sx={{ backgroundColor: '#ffebcc', color: '#333', p: 3, borderRadius: 1 }}>
          <Typography variant="body2">New donation request received! Click to approve.</Typography>
        </Box>
      </Box>

      {/* Pending Tasks */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>Pending Tasks</Typography>
        <List sx={{ backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          {['Approve new pet adoption request', 'Review new donation'].map((task, index) => (
            <ListItem key={index} sx={{ '&:hover': { backgroundColor: '#eee' } }}>
              <ListItemText primary={task} sx={{ color: '#000' }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;
