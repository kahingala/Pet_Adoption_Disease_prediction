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
export const deleteCampaignRequest = (campaignId) => ({
  type: 'DELETE_CAMPAIGN_REQUEST',
  payload: campaignId,
});

export const deleteCampaignSuccess = (campaignId) => ({
  type: 'DELETE_CAMPAIGN_SUCCESS',
  payload: campaignId,
});

export const deleteCampaignFailure = (error) => ({
  type: 'DELETE_CAMPAIGN_FAILURE',
  payload: error,
});

export const deleteCampaign = (campaignId) => async (dispatch) => {
  dispatch(deleteCampaignRequest(campaignId));
  try {
    console.log("Deleting campaign with ID:", campaignId); // Verify campaignId
    console.log("API_BASE_URL: ", API_BASE_URL);
    await axios.delete(`<span class="math-inline">\{API\_BASE\_URL\}/api/campaigns/</span>{campaignId}`);
    dispatch(deleteCampaignSuccess(campaignId));
  } catch (error) {
    dispatch(deleteCampaignFailure(error.message));
  }
};
export const updateCampaignRequest = (campaign) => ({
  type: 'UPDATE_CAMPAIGN_REQUEST',
  payload: campaign,
});

export const updateCampaignSuccess = (campaign) => ({
  type: 'UPDATE_CAMPAIGN_SUCCESS',
  payload: campaign,
});
export const updateCampaignFailure = (error) => ({
  type: 'UPDATE_CAMPAIGN_FAILURE',
  payload: error,
});

export const updateCampaign = (campaign) => async (dispatch) => {
  dispatch(updateCampaignRequest(campaign));
  try {
    console.log('Campaign data being sent:', campaign);
    const formData = new FormData();
    for (const key in campaign) {
      if (key === 'images' && campaign.imagesFiles) {
        campaign.imagesFiles.forEach((file) => {
          formData.append('images', file);
        });
      } else {
        formData.append(key, campaign[key]);
      }
    }
    console.log('Updating campaign with ID:', campaign._id); // Verify campaign._id
    console.log('API_BASE_URL: ', API_BASE_URL);
    const url = `${API_BASE_URL}/api/campaigns/${campaign._id}`; // Use template literals
    console.log("Full URL: ", url); //verify full url
    const response = await axios.put(url, campaign);
    console.log(response); // Send campaign data
    dispatch({ type: 'UPDATE_CAMPAIGN_SUCCESS', payload: response.data });
   } catch (error) {
    dispatch(updateCampaignFailure(error.message));
    console.log('error update ');
  }
};
// Add more actions for update, delete, etc. if needed