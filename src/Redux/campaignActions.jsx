// src/features/campaigns/campaignActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../api';

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/api/campaigns`);
    return response.data;
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (campaignData) => {
    // Assuming you have an admin token in local storage or state
    // const token = localStorage.getItem('adminToken');
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    const response = await axios.post(`${API_BASE_URL}/api/campaigns`, campaignData);
    return response.data;
  }
);

export const fetchCampaignDetails = createAsyncThunk(
  'campaigns/fetchCampaignDetails',
  async (id) => {
    const response = await axios.get(`${API_BASE_URL}/api/campaigns/${id}`);
    return response.data;
  }
);

// Add more actions for update, delete, etc. if needed