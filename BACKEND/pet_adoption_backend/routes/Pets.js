const express = require("express");
const router = express.Router();
const Pet = require("../models/Pets");
const upload = require("../Upload/upload"); // Middleware for image upload

// Create new pet (with image upload)
router.post("/add", upload.single("profilePhoto"), async (req, res) => {
    try {
        const { name, birthday, gender, medicalHistory } = req.body;
        const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null;

        const newPet = new Pet({ name, birthday, gender, medicalHistory, profilePhoto });
        await newPet.save();

        res.status(201).json({ status: "Pet saved successfully", pet: newPet });
    } catch (error) {
        res.status(400).json({ status: "Error saving pet", error: error.message });
    }
});

// Read all pets
router.get("/", async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ status: "Error fetching pets", error: error.message });
    }
});

// Update pet by ID
router.put("/update/:id", upload.single("profilePhoto"), async (req, res) => {
    try {
        const { name, birthday, gender, medicalHistory } = req.body;
        let updateData = { name, birthday, gender, medicalHistory };

        // If a new profile photo is uploaded, update the file path
        if (req.file) {
            updateData.profilePhoto = `/uploads/${req.file.filename}`;
        }

        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ status: "Pet updated", pet: updatedPet });
    } catch (error) {
        res.status(500).json({ status: "Error updating pet", error: error.message });
    }
});

// Delete pet by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "Pet deleted" });
    } catch (error) {
        res.status(500).json({ status: "Error deleting pet", error: error.message });
    }
});

// Get pet by ID
router.get("/get/:id", async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        res.status(200).json({ status: "Pet fetched", pet });
    } catch (error) {
        res.status(500).json({ status: "Error fetching pet", error: error.message });
    }
});

// Search pets by name, gender, or birthday
router.get("/search/:key", async (req, res) => {
    try {
        const key = req.params.key.trim();
        console.log("Search Key:", key);

        const nameRegex = new RegExp(escapeRegExp(key), "i");
        const genderRegex = new RegExp(escapeRegExp(key), "i");

        let result;

        if (!isNaN(Date.parse(key))) {
            result = await Pet.find({ birthday: new Date(key) });
        } else {
            result = await Pet.find({
                $or: [{ name: nameRegex }, { gender: genderRegex }],
            });
        }

        console.log("Search Result:", result);
        res.send(result);
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).send({ error: "An error occurred while searching.", details: error.message });
    }
});

// Helper function to escape special characters in a regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = router;
