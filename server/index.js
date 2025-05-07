const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const PDPredictorModel = require('./models/PDPredictor')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://dasanayakeh7:SPuGsvHPvgLycQgP@cluster0.hrblau9.mongodb.net/petAdoptionDB");

app.post('/disease', (req, res) => {
    PDPredictorModel.create(req.body)
    .then(petsdiseases => res.json(petsdiseases))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})
