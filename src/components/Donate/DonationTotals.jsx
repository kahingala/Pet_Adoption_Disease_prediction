import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green, grey } from '@mui/material/colors';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: green,
    background: {
      default: grey[100], // Light background
    },
  },
  typography: {
    h4: {
      fontWeight: 600, // Make heading bold
      color: blue[800], // Darker blue
    },
    h6: {
      fontWeight: 500,
      color: green[700],
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: blue[100], // Light blue header
          color: blue[800],         // Dark blue text
          fontWeight: 'bold',
        },
        body: {
          color: grey[800],       // Darker grey text
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow
          borderRadius: 8,            // Rounded corners
          transition: 'transform 0.2s ease-in-out', // Smooth transition
          '&:hover': {
            transform: 'scale(1.02)', // Slight scale on hover
          },
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }
        }
    }
  },
});

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
    <ThemeProvider theme={theme}>
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Donation Totals by User</Typography>
      <div ref={reportRef}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Number of Donations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totals.map((userTotal) => (
                <TableRow key={userTotal._id}>
                  <TableCell component="th" scope="row">
                    {userTotal._id}
                  </TableCell>
                  <TableCell align="right">${userTotal.totalAmount.toFixed(2)}</TableCell>
                  <TableCell align="right">{userTotal.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button onClick={generatePdf} variant="contained" color="primary" sx={{ mt: 4 }}>
        Download PDF Report
      </Button>
    </Box>
  </ThemeProvider>
  );
};

export default DonationTotals;