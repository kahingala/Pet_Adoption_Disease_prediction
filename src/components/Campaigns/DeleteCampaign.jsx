import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api'; // Adjust the import path

const DeleteCampaign = ({ campaignId, onClose, onDeleteSuccess }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/campaigns/${campaignId}`);
      setLoading(false);
      handleClose();
      onDeleteSuccess();
      navigate('/campaignlist');

    } catch (error) {
      console.error('Error deleting campaign:', error);
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Campaign</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this campaign? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCampaign;