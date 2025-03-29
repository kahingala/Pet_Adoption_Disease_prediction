import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Symptom() {
    const [formData, setFormData] = useState({
        animalType: "",
        breed: "",
        gender: "",
        weight: "",
        symptom1: "",
        symptom2: "",
        symptom3: "",
        symptom4: "",
        bodyTemperature: "",
        heartRate: "",
        duration: "",
        appetiteLoss: "",
        vomiting: "",
        diarrhea: "",
        coughing: "",
        laboredBreathing: "",
        lameness: "",
        skinLesions: "",
        nasalDischarge: "",
        eyeDischarge: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Allow only letters, numbers, and spaces
        const filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, ""); 
        
        setFormData({ ...formData, [name]: filteredValue });

        // Show error message if the user tries to enter a special character
        if (value !== filteredValue) {
            setErrors({ ...errors, [name]: "Special characters are not allowed!" });
        } else {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const isFormValid = () => {
        return Object.values(errors).every(error => error === "") &&
               Object.values(formData).every(value => value.trim() !== "");
    };

    return (
        <div className="container mt-4 p-4" style={{ backgroundColor: "#795548", borderRadius: "10px" }}>
            <h2 className="mb-3 text-center text-white">
                Worried About Your Pet? Get Quick Health Advice Now!
            </h2>
            <form>
                <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                        {renderInput("Animal Type", "animalType", formData, handleChange, errors)}
                        {renderInput("Breed", "breed", formData, handleChange, errors)}
                        {renderInput("Gender", "gender", formData, handleChange, errors)}
                        {renderInput("Weight", "weight", formData, handleChange, errors)}
                        {renderInput("Symptom 1", "symptom1", formData, handleChange, errors)}
                        {renderInput("Symptom 2", "symptom2", formData, handleChange, errors)}
                        {renderInput("Symptom 3", "symptom3", formData, handleChange, errors)}
                        {renderInput("Symptom 4", "symptom4", formData, handleChange, errors)}
                        {renderInput("Body Temperature", "bodyTemperature", formData, handleChange, errors)}
                        {renderInput("Heart Rate", "heartRate", formData, handleChange, errors)}
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                        {renderInput("Duration", "duration", formData, handleChange, errors)}
                        {renderInput("Appetite Loss", "appetiteLoss", formData, handleChange, errors)}
                        {renderInput("Vomiting", "vomiting", formData, handleChange, errors)}
                        {renderInput("Diarrhea", "diarrhea", formData, handleChange, errors)}
                        {renderInput("Coughing", "coughing", formData, handleChange, errors)}
                        {renderInput("Labored Breathing", "laboredBreathing", formData, handleChange, errors)}
                        {renderInput("Lameness", "lameness", formData, handleChange, errors)}
                        {renderInput("Skin Lesions", "skinLesions", formData, handleChange, errors)}
                        {renderInput("Nasal Discharge", "nasalDischarge", formData, handleChange, errors)}
                        {renderInput("Eye Discharge", "eyeDischarge", formData, handleChange, errors)}
                    </div>
                </div>

                <div className="text-center mt-4">
                    <Link to="/disease" className={`btn btn-warning text-dark fw-bold ${!isFormValid() ? "disabled" : ""}`}>
                        Predict Disease
                    </Link>
                </div>
            </form>
        </div>
    );
}

// Reusable input field with validation
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

export default Symptom;
