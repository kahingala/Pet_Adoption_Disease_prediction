import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, CardActions, Slider, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Pets = () => {
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
    {
      id: 4,
      name: 'Buddy',
      age: 2,
      type: 'Dog',
      image: 'https://tse2.mm.bing.net/th?id=OIP.ANtAJO13XRZEPpcUYlaUmAHaFm&pid=Api&P=0&h=220',
      description: 'A playful and friendly dog looking for a home.',
    },
  ];

  const [pets, setPets] = useState(initialPets);
  const [filteredPets, setFilteredPets] = useState(initialPets); // State for filtered pets
  const [ageRange, setAgeRange] = useState([0, 5]); // Min and Max Age for the filter
  const [selectedType, setSelectedType] = useState(''); // State for selected pet type

  // Handle age range change
  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
    setFilteredPets(pets.filter((pet) => pet.age >= newValue[0] && pet.age <= newValue[1] && (selectedType ? pet.type === selectedType : true)));
  };

  // Handle type filter change
  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    setFilteredPets(pets.filter((pet) => pet.age >= ageRange[0] && pet.age <= ageRange[1] && (type ? pet.type === type : true)));
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilteredPets(pets.filter((pet) => 
      pet.name.toLowerCase().includes(event.target.value.toLowerCase()) &&
      pet.age >= ageRange[0] && pet.age <= ageRange[1] &&
      (selectedType ? pet.type === selectedType : true)
    ));
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9fafb' }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
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
            transition: 'all 0.3s',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        />
      </Box>

      {/* Age Range Filter */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: '500' }}>Age Range: {ageRange[0]} - {ageRange[1]} years</Typography>
        <Slider
          value={ageRange}
          onChange={handleAgeRangeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} yrs`}
          min={0}
          max={5}
          step={0.1}
          sx={{ width: 300, borderRadius: '25px' }}
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
            sx={{ borderRadius: '25px' }}
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
            <Card sx={{ height: '100%', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}>
              <CardMedia 
                component="img" 
                height="200" 
                image={pet.image} 
                alt={pet.name} 
                sx={{ borderRadius: '15px 15px 0 0', objectFit: 'cover' }} 
              />
              <CardContent sx={{ padding: '16px' }}>
                <Typography variant="h6" sx={{ fontWeight: '600' }}>{pet.name}</Typography>
                <Typography variant="body2" color="textSecondary">{pet.age} | {pet.type}</Typography>
                <Typography variant="body2" sx={{ mt: 2, fontSize: '14px', color: '#333' }}>{pet.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{
                    borderRadius: '25px', 
                    background: 'linear-gradient(45deg, #6a1b9a, #d32f2f)', 
                    '&:hover': { background: 'linear-gradient(45deg, #d32f2f, #6a1b9a)' }
                  }}
                >
                  Adopt {pet.name}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pets;
