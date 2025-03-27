// src/components/CampaignForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const CampaignForm = ({ initialValues, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState(initialValues || {
    title: '',
    description: '',
    goalAmount: '',
    startDate: '',
    endDate: '',
    category: '',
    images: [],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const handleImageChange = (e) => {
    // Implement image upload handling here (e.g., file input)
    const files = Array.from(e.target.files);
    const imageNames = files.map(file => file.name); // Placeholder
    setFormData({ ...formData, images: imageNames });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.title) validationErrors.title = 'Title is required';
    if (!formData.description) validationErrors.description = 'Description is required';
    if (!formData.goalAmount || isNaN(Number(formData.goalAmount)) || Number(formData.goalAmount) <= 0) {
      validationErrors.goalAmount = 'Goal amount must be a positive number';
    }
    if (!formData.category) validationErrors.category = 'Category is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const url = isEdit ? `${API_BASE_URL}/api/campaigns/${id}` : `${API_BASE_URL}/api/campaigns`;
      const method = isEdit ? 'put' : 'post';

      const response = await axios({
        method: method,
        url: url,
        data: formData,
      });

      console.log('Campaign saved:', response.data);
      
      setFormData({
        title: '',
        description: '',
        goalAmount: '',
        startDate: '',
        endDate: '',
        category: '',
        images: [],
      }); // Clear the form on success
      setErrors({});
      navigate('/admin/dashboard'); // Redirect after successful submission
    } catch (err) {
      console.error('Form submission error:', err);
      // Handle form submission errors (e.g., display a general error message)
    }
  };

  const categories = [
    'Medical fund',
    'Free mobile vet clinic',
    'Shelter for abandoned pets',
    'Food for stray dogs',
    'Animal welfare awareness sessions',
  ];

  return (
    
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, margin: '0 auto', marginTop:1, padding: 2 , background: "#FCE4EC"}}>
      <Typography variant="h5" gutterBottom sx={{color:'black'}}>
        {isEdit ? 'Edit Campaign' : 'Create New Campaign'}
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        error={!!errors.description}
        helperText={errors.description}
      />
      <TextField
        label="Goal Amount ($)"
        name="goalAmount"
        value={formData.goalAmount}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
        error={!!errors.goalAmount}
        helperText={errors.goalAmount}
      />
      <TextField
        label="Start Date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
        sx={{
    '& label': {
      color: 'black',
    },
    '& input[type=date]::-webkit-datetime-edit-fields-wrapper': {
      color: 'lightgray', // Or a color that blends with your background initially
    },
    
    }}
        />
        
      <TextField
        label="End Date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
        sx={{
    '& label': {
      color: 'black',
    },'& input[type=date]::-webkit-datetime-edit-fields-wrapper': {
      color: 'lightgray', // Or a color that blends with your background initially
    }}}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formData.category}
          label="Category"
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
        {errors.category && <Typography color="error" variant="caption">{errors.category}</Typography>}
      </FormControl>
      <TextField
        //label="Images (File Input - Placeholder)"
        type="file"
        multiple
        onChange={handleImageChange}
        fullWidth
        margin="normal"
        disabled // Implement actual upload logic
      />
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        {isEdit ? 'Update Campaign' : 'Create Campaign'}
      </Button>
    </Box>
  );
};

export default CampaignForm;