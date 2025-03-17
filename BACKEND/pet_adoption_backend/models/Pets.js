// models/Pets.js

const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    medicalHistory: {
        type: String
    },
    profilePhoto: {
        type: String // Store the URL or file path of the uploaded image
    }
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
/*http://localhost:5000/pets/add*/
