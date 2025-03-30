const express = require("express");
const router = express.Router();

// Example mock data for pets (replace with real DB logic)
const pets = [
  { id: 1, name: "Buddy", type: "Dog", age: 3 },
  { id: 2, name: "Mittens", type: "Cat", age: 2 },
];

// GET /pets - Fetch all pets
router.get("/", (req, res) => {
  res.json(pets);
});

// POST /pets - Add a new pet
router.post("/", (req, res) => {
  const newPet = req.body;
  newPet.id = pets.length + 1; // Simple ID increment
  pets.push(newPet);
  res.status(201).json(newPet);
});

// PUT /pets/:id - Update a pet by ID
router.put("/:id", (req, res) => {
  const petId = parseInt(req.params.id);
  const updatedPet = req.body;

  const index = pets.findIndex((pet) => pet.id === petId);
  if (index !== -1) {
    pets[index] = { ...pets[index], ...updatedPet };
    res.json(pets[index]);
  } else {
    res.status(404).json({ error: "Pet not found" });
  }
});

// DELETE /pets/:id - Delete a pet by ID
router.delete("/:id", (req, res) => {
  const petId = parseInt(req.params.id);
  const index = pets.findIndex((pet) => pet.id === petId);

  if (index !== -1) {
    const deletedPet = pets.splice(index, 1);
    res.json(deletedPet);
  } else {
    res.status(404).json({ error: "Pet not found" });
  }
});

module.exports = router;
