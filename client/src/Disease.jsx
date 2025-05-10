import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Disease() {
    const location = useLocation();
    const navigate = useNavigate();
    const { prediction, animalType } = location.state || {};

    return (
        <div className="container mt-4 p-4 text-center">
            <h2>Disease Prediction Results</h2>
            {prediction ? (
                <>
                    <p><strong>Animal Type:</strong> {animalType}</p>
                    <p><strong>Predicted Disease:</strong> {prediction}</p>
                </>
            ) : (
                <div className="alert alert-warning">
                    No prediction data found. Please go back and submit the form again.
                </div>
            )}
            <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
}

export default Disease;
