import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const DonationTotals = () => {
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef(null); 

  useEffect(() => {
    const fetchDonationTotals = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/donations/totals`);
        setTotals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donation totals:', error);
        setError(error.message || 'Failed to fetch donation totals.');
        setLoading(false);
      }
    };

    fetchDonationTotals();
  }, []);
  
  const generatePdf = () => {
    if (reportRef.current) {
      const input = reportRef.current;
      html2canvas(input, { scale: 2 }) // Increase scale for better resolution
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4', true); // Use A4 and set orientation
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          let x = (pdfWidth - canvas.width) / 2;
          if (x < 0) {
            x = 0;
          }

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Use 0,0 for full page
          pdf.save('donation-totals.pdf');
        })
        .catch((err) => {
          console.error("Error generating PDF", err)
        });
    }
  };

  if (loading) {
    return <Typography>Loading donation totals...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (totals.length === 0) {
    return <Typography>No donations found.</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Donation Totals by User</Typography>
      <div ref={reportRef}>
      {totals.map((userTotal) => (
        <Card key={userTotal._id} sx={{ mb: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              User: {userTotal._id}
            </Typography>
            <Typography>
              Total Amount: ${userTotal.totalAmount}
            </Typography>
             <Typography>
              Number of Donations: {userTotal.count}
            </Typography>
          </CardContent>
        </Card>
      ))}
      </div>
      <Button onClick={generatePdf} variant="contained" sx={{ mt: 2 }}>
        Download PDF Report
      </Button>
    </Box>
  );
};

export default DonationTotals;