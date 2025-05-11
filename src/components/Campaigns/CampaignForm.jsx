// src/components/CampaignForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { updateCampaign } from '../../Redux/campaignActions';
import { useDispatch } from 'react-redux';

const CampaignForm = ({ initialValues, onSubmit, isEdit }) => {
  console.log('CampaignForm rendered');
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValues || {
    title: '',
    description: '',
    goalAmount: '',
    startDate: '',
    endDate: '',
    category: '',
    images: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state
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
    setImageFile(...e.target.files);
    // Implement image upload handling here (e.g., file input)
    //const files = Array.from(e.target.files);
    //const imageNames = files.map(file => file.name); // Placeholder
    //setFormData({ ...formData, images: imageNames });
  };
  const handleUploadImage = async () => {
    if (!imageFile) {
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('image', imageFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image url', response.data.imageUrl);
      setImageUrl(response.data.imageUrl);
      setFormData({ ...formData, images: [response.data.imageUrl] });
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = {};
    if (!formData.title) validationErrors.title = 'Title is required';
    if (!formData.description) validationErrors.description = 'Description is required';
    if (!formData.goalAmount || isNaN(Number(formData.goalAmount)) || Number(formData.goalAmount) <= 0) {
      validationErrors.goalAmount = 'Goal amount must be a positive number';
    }
    if (!formData.category) validationErrors.category = 'Category is required';
    if (!imageFile) {
      validationErrors.image = 'Image is required';
    }
    if (formData.startDate && formData.endDate) { // Only check if both are present
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

      if (start > end) {
        validationErrors.endDate = 'End date must be after start date';
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
  
     /* const url = isEdit ? `${API_BASE_URL}/api/campaigns/${id}` : `${API_BASE_URL}/api/campaigns`;
      const method = isEdit ? 'put' : 'post';

      const response = await axios({
        method: method,
        url: url,
        data: formData,
      });*/
      if (isEdit) {
        // Edit mode: Use Redux action
        console.log('Campaign data before dispatch:', formData);
        await dispatch(updateCampaign({ ...formData, _id: id }));
      } else {
        // Create mode: Use axios post
        const url = `${API_BASE_URL}/api/campaigns`;
        const response = await axios.post(url, formData);
        console.log('Campaign saved:', response.data);
      }

      //console.log('Campaign saved:', response.data);
      
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
      navigate('/campaignlist'); // Redirect after successful submission
    } catch (err) {
      console.error('Form submission error:', err);
      // Handle form submission errors (e.g., display a general error message)
    }finally {
      setLoading(false); // Stop loading
      
    }
  };
  const handleCancel = () => {
    navigate('/campaignlist'); // Go back to the campaign list or your desired route
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
        disabled={loading}
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
        disabled={loading}
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
        disabled={loading}
      />
      <TextField
        label="Start Date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="date"
        disabled={loading}
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
        error={!!errors.endDate}
        helperText={errors.endDate}
        disabled={loading}
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
          disabled={loading}
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
        //fullWidth
        margin="normal"
       // disabled // Implement actual upload logic
             />
             {errors.image && (
        <Typography color="error">{errors.image}</Typography>
      )}
      <Button onClick={handleUploadImage} sx={{ marginTop: 3 }}>Upload Image</Button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '200px' }} />}
      <Button type="submit" variant="contained" disabled={loading} color="primary" sx={{ marginTop: 2 }}>
        {isEdit ? 'Update Campaign' : 'Create Campaign'}
      </Button>
      {loading && <CircularProgress />}
      <Button variant="outlined" onClick={handleCancel} sx={{ marginTop: 2, marginLeft:5 }}>
          Cancel
        </Button>
    </Box>
  );
};

export default CampaignForm;