// src/components/ProgressIndicator.js
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const ProgressIndicator = ({ current, goal }) => {
  const percentage = goal > 0 ? (current / goal) * 100 : 0;

  return (
    <Box sx={{ width: '100%', marginTop: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {`$${current.toFixed(2)} raised of $${goal.toFixed(2)}`}
      </Typography>
      <LinearProgress variant="determinate" value={percentage} sx={{ marginTop: 0.5 }} />
      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
        {`${percentage.toFixed(0)}% Funded`}
      </Typography>
    </Box>
  );
};

export default ProgressIndicator;