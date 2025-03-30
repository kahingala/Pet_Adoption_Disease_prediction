import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Symptom() {
    const navigate = useNavigate();

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
        duration: ""
    });

    const [errors, setErrors] = useState({});

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

        // Fields that only allow integers (Weight, Body Temperature, Heart Rate, Duration)
        if (["weight", "bodyTemperature", "heartRate", "duration"].includes(name)) {
            // Only allow digits
            if (!/^\d*$/.test(value)) {
                setErrors({ ...errors, [name]: `${name} must be a valid integer!` });
                return; // Prevent input if it's not a valid integer
            } else {
                setErrors({ ...errors, [name]: "" }); // Clear error if the input is valid
            }
        }

        // Allow only letters, numbers, and spaces for other fields
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            navigate("/disease");
        }
    };

    return (
        <div className="container mt-4 p-4" style={{ backgroundColor: "#795548", borderRadius: "10px" }}>
            <h2 className="mb-3 text-center text-white">
                Worried About Your Pet? Get Quick Health Advice Now!
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        {renderInput("Animal Type", "animalType", formData, handleChange, errors)}
                        {renderInput("Breed", "breed", formData, handleChange, errors)}
                        {renderInput("Gender", "gender", formData, handleChange, errors)}
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

// Reusable dropdown field with validation
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
