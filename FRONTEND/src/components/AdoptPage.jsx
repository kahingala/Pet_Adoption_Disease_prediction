import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, CardActions, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Slider, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { jsPDF } from 'jspdf'; // Import jsPDF

const AdoptPage = () => {
  const initialPets = [
    {
      id: 1,
      name: 'Buddy',
      age: 2,
      type: 'Dog',
      image: 'https://tse2.mm.bing.net/th?id=OIP.ANtAJO13XRZEPpcUYlaUmAHaFm&pid=Api&P=0&h=220',
      description: 'A playful and friendly dog looking for a home.',
    },
    {
      id: 2,
      name: 'Whiskers',
      age: 1,
      type: 'Cat',
      image: 'https://tse2.mm.bing.net/th?id=OIP.96xGC-g0IvkanPsCqf7YhAHaE7&pid=Api&P=0&h=220',
      description: 'A calm and loving cat, perfect for quiet homes.',
    },
    {
      id: 3,
      name: 'Fluffy',
      age: 0.25,
      type: 'Rabbit',
      image: 'https://tse3.mm.bing.net/th?id=OIP.yqWkZOJzA2DZu_H0kqjNOQHaFG&pid=Api&P=0&h=220',
      description: 'A cute and active rabbit in need of a caring family.',
    },
  ];

  const [pets, setPets] = useState(initialPets);
  const [filteredPets, setFilteredPets] = useState(initialPets); // State for filtered pets
  const [ageRange, setAgeRange] = useState([0, 5]); // Min and Max Age for the filter
  const [selectedType, setSelectedType] = useState(''); // State for selected pet type
  const [birthdate, setBirthdate] = useState(''); // State for pet birthdate

  const [openDialog, setOpenDialog] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  // Get current date formatted as MM/DD/YYYY
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-indexed
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Calculate age from birthdate
  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle open dialog for adding/updating pet
  const handleOpenDialog = (pet = null) => {
    setCurrentPet(pet);
    setImageFile(null); // Reset image on dialog open
    setFormErrors({});
    setOpenDialog(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setCurrentPet(null);
    setOpenDialog(false);
  };

  // Validate form fields
  // Validate form fields
const validateForm = (formData) => {
  const errors = {};
  const petBirthdate = formData.get('birthdate');
  const name = formData.get('name');

  // Regular expression to check if the name contains only letters and spaces
  const nameRegex = /^[A-Za-z\s]+$/;

  // Calculate age based on birthdate
  const age = calculateAge(petBirthdate);

  if (!name) {
    errors.name = 'Name is required';
  } else if (!nameRegex.test(name)) {
    errors.name = 'Name can only contain letters and spaces';
  }

  if (!petBirthdate) errors.birthdate = 'Birthdate is required';
  if (age < 0 || age > 5) errors.age = 'Age must be between 0.1 and 5 years'; // Age validation
  if (!formData.get('type')) errors.type = 'Type is required';
  if (!formData.get('description')) errors.description = 'Description is required';
  if (!imageFile) errors.image = 'Image is required';

  return errors;
};


  // Handle form submit to add or update pet
  /*const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      const age = calculateAge(formData.get('birthdate'));

      const newPet = {
        id: currentPet ? currentPet.id : pets.length + 1,
        name: formData.get('name'),
        age: age,
        type: formData.get('type'),
        image: URL.createObjectURL(imageFile) || 'https://via.placeholder.com/150',
        description: formData.get('description'),
      };

      if (currentPet) {
        setPets(pets.map((pet) => (pet.id === currentPet.id ? newPet : pet)));
      } else {
        setPets([...pets, newPet]);
      }

      handleCloseDialog();
    } else {
      setFormErrors(errors);
    }
  };*/
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);
  
    if (Object.keys(errors).length === 0) {
      const age = calculateAge(formData.get('birthdate'));
  
      const newPet = {
        id: currentPet ? currentPet.id : pets.length + 1,
        name: formData.get('name'),
        age: age,
        type: formData.get('type'),
        image: URL.createObjectURL(imageFile) || 'https://via.placeholder.com/150',
        description: formData.get('description'),
      };
  
      if (currentPet) {
        setPets(pets.map((pet) => (pet.id === currentPet.id ? newPet : pet)));
      } else {
        setPets([...pets, newPet]);
      }
  
      handleCloseDialog();
    } else {
      setFormErrors(errors);
      window.alert("Please fill all required fields correctly before adding a pet.");
    }
  };
  

  // Handle delete pet
  const handleDeletePet = (id) => {
    const petExists = pets.some((pet) => pet.id === id);
  
    if (!petExists) {
      window.alert("Error: Pet not found!");
      return;
    }
  
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
    setFilteredPets(updatedPets); // Ensure filteredPets state is also updated
  };
  

  // Handle file drop/upload
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setImageFile(acceptedFiles[0]),
    accept: 'image/*',
  });

  // Handle age range change
  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
    // Filter pets based on the selected age range and type
    setFilteredPets(pets.filter((pet) => pet.age >= newValue[0] && pet.age <= newValue[1] && (selectedType ? pet.type === selectedType : true)));
  };

  // Handle type filter change
  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    // Filter pets based on the selected type and age range
    setFilteredPets(pets.filter((pet) => pet.age >= ageRange[0] && pet.age <= ageRange[1] && (type ? pet.type === type : true)));
  };

  // Handle generate report for all pets
  const handleGenerateReportAllPets = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("All Pets Adoption Report", 20, 20);
    doc.setFontSize(12);

    // Add current date to the report
    const currentDate = getCurrentDate();
    doc.text(`Date: ${currentDate}`, 20, 30);

    pets.forEach((pet, index) => {
      const petText = `Pet ${index + 1}: 
      Name: ${pet.name} 
      Age: ${pet.age} 
      Type: ${pet.type} 
      Description: ${pet.description}\n`;
      doc.text(petText, 20, 40 + index * 40);
    });

    doc.save('all_pets_report.pdf');
  };

  // Handle generate individual pet report
  const handleGenerateReport = (pet) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${pet.name} Adoption Report`, 20, 20);

    // Add current date to the report
    const currentDate = getCurrentDate();
    doc.text(`Date: ${currentDate}`, 20, 30);

    doc.setFontSize(12);
    const petText = `Name: ${pet.name} 
      Age: ${pet.age} 
      Type: ${pet.type} 
      Description: ${pet.description}\n`;
    doc.text(petText, 20, 40);

    doc.save(`${pet.name}_report.pdf`);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#fff', color: '#000' }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Available Pets for Adoption
      </Typography>

      {/* Button to Add New Pet */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()}>
          Add New Pet
        </Button>
      </Box>

      {/* Button to generate report for all pets */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleGenerateReportAllPets}>
          Generate Report for All Pets (PDF)
        </Button>
      </Box>

      {/* Age Range Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Typography variant="body1">Age Range: {ageRange[0]} - {ageRange[1]} years</Typography>
        <Slider
          value={ageRange}
          onChange={handleAgeRangeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} yrs`}
          min={0}
          max={5}
          step={0.1}
          sx={{ width: 300 }}
        />
      </Box>

      {/* Type Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <FormControl variant="outlined" sx={{ minWidth: 120, backgroundColor: '#333' }}>
          <InputLabel sx={{ color: '#fff' }}>Pet Type</InputLabel>
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            label="Pet Type"
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f5f5f5',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f5f5f5',
              },
            }}
          >
            <MenuItem value="">
              <em>All Types</em>
            </MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Pets List Grid */}
      <Grid container spacing={4}>
        {filteredPets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia component="img" height="200" image={pet.image} alt={pet.name} />
              <CardContent>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography variant="body2" color="textSecondary">{pet.age} | {pet.type}</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>{pet.description}</Typography>
              </CardContent>
              <CardActions>
                {/* Button to generate individual pet report */}
                <Button variant="contained" color="primary" onClick={() => handleGenerateReport(pet)} fullWidth>
                  Generate Report (PDF)
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleOpenDialog(pet)}>
                  Update
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDeletePet(pet.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Add/Update Pet */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentPet ? 'Update Pet' : 'Add New Pet'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Name"
              name="name"
              defaultValue={currentPet ? currentPet.name : ''}
              fullWidth
              sx={{ mb: 2 }}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              label="Birthdate"
              name="birthdate"
              type="date"
              defaultValue={currentPet ? currentPet.birthdate : ''}
              fullWidth
              sx={{ mb: 2 }}
              error={!!formErrors.birthdate}
              helperText={formErrors.birthdate}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                defaultValue={currentPet ? currentPet.type : ''}
                error={!!formErrors.type}
              >
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Rabbit">Rabbit</MenuItem>
              </Select>
              {formErrors.type && <FormHelperText error>{formErrors.type}</FormHelperText>}
            </FormControl>
            <TextField
              label="Description"
              name="description"
              defaultValue={currentPet ? currentPet.description : ''}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
              error={!!formErrors.description}
              helperText={formErrors.description}
            />
            <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', padding: 2, textAlign: 'center', mb: 2 }}>
              <input {...getInputProps()} />
              <Typography variant="body2" sx={{ color: '#777' }}>Drop image here or click to select</Typography>
            </Box>
            {formErrors.image && <FormHelperText error>{formErrors.image}</FormHelperText>}
            <DialogActions>
              <Button variant="contained" color="primary" type="submit">
                {currentPet ? 'Update Pet' : 'Add Pet'}
              </Button>
              <Button variant="outlined" onClick={handleCloseDialog}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdoptPage;
