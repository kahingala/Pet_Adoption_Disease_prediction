import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';

const Footer1 = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#6D4C41', // Light brown background
        padding: '30px 20px',
        color: 'white', // Dark text color
      }}
    >
      <Grid container spacing={4} justifyContent="space-around">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            Paw Pet Care is dedicated to providing high-quality products for your pets. From nutritious food to fun toys, we ensure every item is crafted with care and love.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <Box>
            <Link href="#" color="inherit" display="block">
              Home
            </Link>
            <Link href="#" color="inherit" display="block">
              About Us
            </Link>
            <Link href="#" color="inherit" display="block">
              Delivery
            </Link>
            <Link href="#" color="inherit" display="block">
              Privacy Policy
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Get in Touch
          </Typography>
          <Box>
            <Typography variant="body2">
              Phone: +1-212-456-7890
            </Typography>
            <Typography variant="body2">
              Email: contact@pow.com
            </Typography>
            <Typography variant="body2">
              Support: support@pow.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <Typography variant="caption">
          © 2023 Paw Pet Care. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer1;