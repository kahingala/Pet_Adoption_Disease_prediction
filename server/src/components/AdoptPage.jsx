import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent,
  Button, CardActions, TextField, Dialog, DialogActions,
  DialogContent, DialogTitle, Slider, FormControl, InputLabel,
  Select, MenuItem, Snackbar, Alert
} from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { jsPDF } from 'jspdf';

const AdoptPage = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [ageRange, setAgeRange] = useState([0, 5]);
  const [selectedType, setSelectedType] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/pets')
      .then(response => {
        setPets(response.data);
        setFilteredPets(response.data);
      })
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleOpenDialog = (pet = null) => {
    setCurrentPet(pet);
    setImageFile(null);
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setCurrentPet(null);
    setOpenDialog(false);
  };

  const validateForm = (formData) => {
    const errors = {};
    const name = formData.get('name');
    const birthdate = formData.get('birthdate');
    const nameRegex = /^[A-Za-z\s]+$/;
    const age = calculateAge(birthdate);

    if (!name) errors.name = 'Name is required';
    else if (!nameRegex.test(name)) errors.name = 'Only letters and spaces allowed';

    if (!birthdate) errors.birthdate = 'Birthdate is required';
    else if (age < 0 || age > 5) errors.age = 'Age must be between 0.1 and 5 years';

    if (!formData.get('type')) errors.type = 'Type is required';
    if (!formData.get('description')) errors.description = 'Description is required';
    if (!imageFile && !currentPet?.image) errors.image = 'Image is required';

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      const petData = {
        name: formData.get('name'),
        birthdate: formData.get('birthdate'),
        age: calculateAge(formData.get('birthdate')),
        type: formData.get('type'),
        description: formData.get('description'),
        image: currentPet?.image || '',
      };

      if (imageFile) {
        petData.image = URL.createObjectURL(imageFile);
      }

      try {
        if (currentPet) {
          const res = await axios.put(`http://localhost:5000/api/pets/${currentPet._id}`, petData);
          const updatedList = pets.map(p => p._id === currentPet._id ? res.data : p);
          setPets(updatedList);
          setFilteredPets(updatedList);
          setSnackbarMessage('Pet updated successfully!');
        } else {
          const res = await axios.post('http://localhost:5000/api/pets', petData);
          const newList = [...pets, res.data];
          setPets(newList);
          setFilteredPets(newList);
          setSnackbarMessage('Pet added successfully!');
        }
        setSnackbarOpen(true);
        handleCloseDialog();
      } catch (error) {
        console.error('Error saving pet:', error);
        alert('Something went wrong. Please try again.');
      }

    } else {
      setFormErrors(errors);
      alert("Please fix form errors.");
    }
  };

  const handleDeletePet = (id) => {
    axios.delete(`http://localhost:5000/api/pets/${id}`)
      .then(() => {
        const updatedPets = pets.filter(pet => pet._id !== id);
        setPets(updatedPets);
        setFilteredPets(updatedPets);
        setSnackbarMessage('Pet deleted successfully!');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error deleting pet:', error);
        alert('Failed to delete pet.');
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setImageFile(acceptedFiles[0]),
    accept: { 'image/*': [] },
  });

  const handleAgeRangeChange = (e, newValue) => {
    setAgeRange(newValue);
    applyFilters(newValue, selectedType);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    applyFilters(ageRange, type);
  };

  const applyFilters = (range, type) => {
    const filtered = pets.filter(pet =>
      pet.age >= range[0] && pet.age <= range[1] &&
      (!type || pet.type === type)
    );
    setFilteredPets(filtered);
  };

  const handleGenerateReportAllPets = () => {
    const doc = new jsPDF();
    // Header
    doc.setFillColor(61, 43, 31); // dark brown
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('All Pets Adoption Report', 105, 18, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${getCurrentDate()}`, 15, 38);
    // Table header
    doc.setFillColor(240, 200, 160); // light brown
    doc.rect(10, 45, 190, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('No.', 15, 52);
    doc.text('Name', 30, 52);
    doc.text('Age', 70, 52);
    doc.text('Type', 90, 52);
    doc.text('Description', 120, 52);
    doc.setFont('helvetica', 'normal');
    let y = 60;
    pets.forEach((pet, index) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`${index + 1}`, 15, y);
      doc.text(pet.name, 30, y);
      doc.text(`${pet.age}`, 70, y);
      doc.text(pet.type, 90, y);
      doc.text(doc.splitTextToSize(pet.description, 80), 120, y);
      y += 12;
    });
    doc.save('all_pets_report.pdf');
  };

  const handleGenerateReport = (pet) => {
    const doc = new jsPDF();
    // Header
    doc.setFillColor(61, 43, 31); // dark brown
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`${pet.name} Adoption Report`, 105, 18, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${getCurrentDate()}`, 15, 38);
    // Pet details box
    doc.setFillColor(240, 200, 160); // light brown
    doc.roundedRect(15, 45, 180, 40, 5, 5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', 25, 60);
    doc.text('Age:', 25, 70);
    doc.text('Type:', 100, 60);
    doc.text('Description:', 25, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(pet.name, 45, 60);
    doc.text(`${pet.age}`, 45, 70);
    doc.text(pet.type, 120, 60);
    doc.text(doc.splitTextToSize(pet.description, 150), 45, 80);
    doc.save(`${pet.name}_report.pdf`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#000000' }}>
        Available Pets for Adoption
      </Typography>

      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Button variant="contained" onClick={() => handleOpenDialog()}>Add New Pet</Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleGenerateReportAllPets}>Generate All Reports</Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
        <Typography sx={{ color: '#000000' }}>Age Range: {ageRange[0]} - {ageRange[1]} yrs</Typography>
        <Slider value={ageRange} onChange={handleAgeRangeChange} min={0} max={5} step={0.1} sx={{ width: 300 }} />
      </Box>

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Pet Type</InputLabel>
          <Select value={selectedType} onChange={handleTypeChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {filteredPets.map(pet => (
          <Grid item xs={12} sm={6} md={4} key={pet._id}>
            <Card>
              <CardMedia component="img" height="200" image={pet.image} alt={pet.name} />
              <CardContent>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography variant="body2">{pet.age} yrs | {pet.type}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{pet.description}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleGenerateReport(pet)}>Report</Button>
                <Button onClick={() => handleOpenDialog(pet)}>Update</Button>
                <Button color="error" onClick={() => handleDeletePet(pet._id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentPet ? 'Update Pet' : 'Add New Pet'}</DialogTitle>
        <DialogContent>
          <form id="pet-form" onSubmit={handleFormSubmit}>
            <TextField name="name" label="Name" defaultValue={currentPet?.name || ''} fullWidth sx={{ mb: 2 }} error={!!formErrors.name} helperText={formErrors.name} />
            <TextField name="birthdate" label="Birthdate" type="date" defaultValue={currentPet?.birthdate || ''} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} error={!!formErrors.birthdate} helperText={formErrors.birthdate} />
            <TextField name="type" label="Type" defaultValue={currentPet?.type || ''} fullWidth sx={{ mb: 2 }} error={!!formErrors.type} helperText={formErrors.type} />
            <TextField name="description" label="Description" defaultValue={currentPet?.description || ''} fullWidth multiline rows={4} sx={{ mb: 2 }} error={!!formErrors.description} helperText={formErrors.description} />
            <Box {...getRootProps()} sx={{ border: '1px dashed grey', p: 2, textAlign: 'center', mb: 2 }}>
              <input {...getInputProps()} />
              <Typography>{imageFile ? imageFile.name : 'Drag & drop or click to upload image'}</Typography>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit" form="pet-form">{currentPet ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdoptPage;
