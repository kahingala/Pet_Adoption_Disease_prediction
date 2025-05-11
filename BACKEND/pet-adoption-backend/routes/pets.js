const express = require('express');
const multer = require('multer');
const path = require('path');
const Pet = require('../models/Pet');

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ Upload image route
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `http://localhost:5000/api/pets/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// ✅ Get all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new pet
router.post('/', async (req, res) => {
  const pet = new Pet(req.body);
  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update a pet
router.put('/:id', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete a pet
router.delete('/:id', async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
