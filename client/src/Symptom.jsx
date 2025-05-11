import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Symptom() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        animalType: "",
        breed: "",
        gender: "",
        age: "",
        weight: "",
        symptom1: "",
        symptom2: "",
        symptom3: "",
        symptom4: "",
        bodyTemperature: "",
        heartRate: "",
        duration: ""
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [prediction, setPrediction] = useState("");

    const symptoms = [
        "Select Symptom",
        "Fever",
        "Lameness",
        "Coughing",
        "Lethargy",
        "Nasal discharge",
        "Eye discharge",
        "Loss of appetite",
        "Weight Loss",
        "Vomiting",
        "Diarrhea",
        "Swollen Joints",
        "Labored breathing",
        "Difficulty breathing",
        "Skin Lesions",
        "Sneezing",
        "Excessive thirst"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        let errorMessage = "";

        if (["animalType", "breed", "gender"].includes(name)) {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                errorMessage = `${name} should only contain letters and spaces!`;
                newValue = value.replace(/[^a-zA-Z\s]/g, "");
            }
        }

        if (["weight", "bodyTemperature", "heartRate", "duration", "age"].includes(name)) {
            if (!/^\d*$/.test(value)) {
                errorMessage = `${name} must be a valid integer!`;
                newValue = value.replace(/\D/g, "");
            }
        }

        setFormData({ ...formData, [name]: newValue });
        setErrors({ ...errors, [name]: errorMessage });
    };

    const isFormValid = () => {
        return Object.values(errors).every(error => error === "") &&
               Object.values(formData).every(value => value.trim() !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            setServerError("Please fill all fields correctly before submitting.");
            return;
        }

        try {
            // Send data to the database (optional, comment out for testing)
            // await axios.post("http://localhost:3001/disease", formData);

            // Directly set the prediction to "Respiratory Infection"
            setPrediction("Respiratory Infection");
            setServerError(""); // Clear any server error
            
        } catch (error) {
            console.error("Error during prediction:", error);
            setServerError("Something went wrong while predicting the disease.");
        }
    };

    return (
        <div className="container mt-4 p-4" style={{ backgroundColor: "#795548", borderRadius: "10px" }}>
            <h2 className="mb-3 text-center text-white">
                Worried About Your Pet? Get Quick Health Advice Now!
            </h2>

            {serverError && (
                <div className="alert alert-danger text-center">{serverError}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        {renderInput("Animal Type", "animalType", formData, handleChange, errors)}
                        {renderInput("Breed", "breed", formData, handleChange, errors)}
                        {renderInput("Gender", "gender", formData, handleChange, errors)}
                        {renderInput("Age", "age", formData, handleChange, errors)}
                        {renderInput("Weight", "weight", formData, handleChange, errors)}
                        {renderInput("Body Temperature", "bodyTemperature", formData, handleChange, errors)}
                        {renderInput("Heart Rate", "heartRate", formData, handleChange, errors)}
                    </div>
                    <div className="col-md-6">
                        {renderDropdown("Symptom 1", "symptom1", formData, handleChange, errors, symptoms)}
                        {renderDropdown("Symptom 2", "symptom2", formData, handleChange, errors, symptoms)}
                        {renderDropdown("Symptom 3", "symptom3", formData, handleChange, errors, symptoms)}
                        {renderDropdown("Symptom 4", "symptom4", formData, handleChange, errors, symptoms)}
                        {renderInput("Duration", "duration", formData, handleChange, errors)}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary">
                        Predict Disease
                    </button>
                </div>
                {prediction && (
                    <div className="alert alert-success text-center mt-3">
                        Prediction: {prediction}
                    </div>
                )}
            </form>
        </div>
    );
}

const renderInput = (label, name, formData, handleChange, errors) => {
    return (
        <div className="mb-3">
            <label className="form-label text-white"><strong>{label}</strong></label>
            <input
                type="text"
                name={name}
                value={formData[name]}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="form-control"
                autoComplete="off"
                onChange={handleChange}
            />
            {errors[name] && (
                <div style={{ fontWeight: "bold", color: "white", marginTop: "5px" }}>
                    {errors[name]}
                </div>
            )}
        </div>
    );
};

const renderDropdown = (label, name, formData, handleChange, errors, options) => {
    return (
        <div className="mb-3">
            <label className="form-label text-white"><strong>{label}</strong></label>
            <select
                name={name}
                value={formData[name]}
                className="form-control"
                onChange={handleChange}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <div style={{ fontWeight: "bold", color: "white", marginTop: "5px" }}>
                    {errors[name]}
                </div>
            )}
        </div>
    );
};

export default Symptom;