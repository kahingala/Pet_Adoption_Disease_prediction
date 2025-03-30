import React from 'react';
import { Box, Button } from '@mui/material';
import { jsPDF } from 'jspdf';

const GenerateReport = ({ pets }) => {
  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Title of the report
    doc.setFontSize(18);
    doc.text('Pet Adoption Report', 20, 20);

    // Adding the table header
    doc.setFontSize(12);
    doc.text('ID', 20, 40);
    doc.text('Name', 40, 40);
    doc.text('Type', 100, 40);
    doc.text('Age', 140, 40);
    doc.text('Description', 180, 40);

    // Adding pet details to the PDF
    pets.forEach((pet, index) => {
      const y = 50 + index * 10; // Position for each row
      doc.text(pet.id.toString(), 20, y);
      doc.text(pet.name, 40, y);
      doc.text(pet.type, 100, y);
      doc.text(pet.age.toString(), 140, y);
      doc.text(pet.description, 180, y);
    });

    // Save the PDF
    doc.save('pet-adoption-report.pdf');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Button variant="contained" color="primary" onClick={generatePDFReport}>
        Generate Pet Adoption Report
      </Button>
    </Box>
  );
};

export default GenerateReport;
