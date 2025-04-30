// src/components/EditCampaign.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api'; // Adjust path
import CampaignForm from './CampaignForm';
import { CircularProgress } from '@mui/material';

const EditCampaign = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/campaigns/${id}`);
        setCampaign(response.data);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!campaign) {
    return <div>Campaign not found.</div>;
  }

  return (
    <div>
      <CampaignForm initialValues={campaign} isEdit={true} />
    </div>
  );
};

export default EditCampaign;