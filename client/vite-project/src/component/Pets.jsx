import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardMedia, CardContent,
  Button, CardActions, Slider, FormControl, InputLabel,
  Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from "@mui/material";
import axios from 'axios';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [ageRange, setAgeRange] = useState([0, 5]);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [adoptForm, setAdoptForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Fetch pets from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/pets')
      .then((response) => {
        setPets(response.data);
        setFilteredPets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
      });
  }, []);

  // Filter logic
  const filterPets = (term, type, age) => {
    const filtered = pets.filter((pet) =>
      pet.name.toLowerCase().includes(term.toLowerCase()) &&
      pet.age >= age[0] &&
      pet.age <= age[1] &&
      (type ? pet.type === type : true)
    );
    setFilteredPets(filtered);
  };

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
    filterPets(searchTerm, selectedType, newValue);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    filterPets(searchTerm, type, ageRange);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterPets(term, selectedType, ageRange);
  };

  const handleAdoptMe = (pet) => {
    setSelectedPet(pet);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdoptForm({
      ...adoptForm,
      [name]: value
    });
  };

  /*const handleSubmitAdoptForm = () => {
    alert(`Adoption request for ${selectedPet.name} submitted!\nName: ${adoptForm.name}\nEmail: ${adoptForm.email}\nPhone: ${adoptForm.phone}\nAddress: ${adoptForm.address}`);
    // You can make an API request here to submit the adoption request
    setOpenDialog(false);
    setAdoptForm({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  };*/
 /* const handleSubmitAdoptForm = () => {
    const adoptionDetails = {
      petName: selectedPet.name,
      adopterName: adoptForm.name,
      adopterEmail: adoptForm.email,
      adopterPhone: adoptForm.phone,
      adopterAddress: adoptForm.address
    };
  
    // Send request to backend to notify admin
    axios.post('http://localhost:5000/api/adopt', adoptionDetails)
      .then(response => {
        alert('Adoption request for ' + selectedPet.name + ' submitted!');
        // Close dialog and reset form
        setOpenDialog(false);
        setAdoptForm({
          name: '',
          email: '',
          phone: '',
          address: ''
        });
      })
      .catch(error => {
        console.error('Error submitting adoption request:', error);
        alert('There was an error submitting your adoption request.');
      });
  };*/
  const handleSubmitAdoptForm = () => {
  alert(`✅ Adoption request submitted successfully!\n\nPet: ${selectedPet?.name}\nName: ${adoptForm.name}\nEmail: ${adoptForm.email}\nPhone: ${adoptForm.phone}\nAddress: ${adoptForm.address}`);

  // Close dialog and reset form
  setOpenDialog(false);
  setAdoptForm({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
};


  
  

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9fafb' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Available Pets for Adoption
      </Typography>

      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by pet name..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '12px',
            fontSize: '16px',
            width: '300px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            outline: 'none',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        />
      </Box>

      {/* Age Range Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: '500' }}>
          Age Range: {ageRange[0]} - {ageRange[1]} years
        </Typography>
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
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Pet Type</InputLabel>
          <Select
            value={selectedType}
            onChange={handleTypeChange}
            label="Pet Type"
          >
            <MenuItem value=""><em>All Types</em></MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Rabbit">Rabbit</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Pets Grid */}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {filteredPets.map(pet => (
          <Grid item xs={12} sm={6} md={4} key={pet._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={
                  pet.image && pet.image.startsWith('http')
                    ? pet.image
                    : pet.image
                      ? `http://localhost:5000/uploads/${pet.image}`
                      : 'https://via.placeholder.com/300x200?text=No+Image'
                }
                alt={pet.name}
              />
              <CardContent>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography variant="body2">{pet.age} yrs | {pet.type}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{pet.description}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleAdoptMe(pet)} variant="contained" color="primary">
                  Adopt Me
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Adoption Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Adopt {selectedPet?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={adoptForm.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={adoptForm.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            name="phone"
            value={adoptForm.phone}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            name="address"
            value={adoptForm.address}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAdoptForm} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Pets;
