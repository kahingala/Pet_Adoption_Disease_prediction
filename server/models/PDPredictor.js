const mongoose = require('mongoose');

const PDPredictorSchema = new mongoose.Schema({
    animalType: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    symptom1: { type: String, required: true },
    symptom2: { type: String, required: true },
    symptom3: { type: String, required: true },
    symptom4: { type: String, required: true },
    bodyTemperature: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    duration: { type: Number, required: true }
})

const PDPredictorModel = mongoose.model("petsdiseases", PDPredictorSchema)

module.exports = PDPredictorModel
