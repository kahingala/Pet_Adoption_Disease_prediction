const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { spawn } = require("child_process");
const PDPredictorModel = require("./models/PDPredictor");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://dasanayakeh7:SPuGsvHPvgLycQgP@cluster0.hrblau9.mongodb.net/petAdoptionDB");

app.post("/disease", async (req, res) => {
    const formData = req.body;

    // Save to MongoDB
    try {
        await PDPredictorModel.create(formData);
    } catch (err) {
        return res.status(500).json({ error: "Database error", details: err });
    }

    // Run Python script with input
    const python = spawn("python", ["server/predictor/predict.py"]);

    let result = "";
    let errorOutput = "";

    python.stdin.write(JSON.stringify(formData));
    python.stdin.end();

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    python.on("close", (code) => {
        if (code !== 0) {
            console.error("Python error:", errorOutput);
            return res.status(500).json({ error: "Prediction script failed", details: errorOutput });
        }

        try {
            const parsed = JSON.parse(result);
            res.json({ prediction: parsed.prediction });
        } catch (err) {
            console.error("JSON parse error:", err);
            res.status(500).json({ error: "Invalid response from prediction script", raw: result });
        }
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
