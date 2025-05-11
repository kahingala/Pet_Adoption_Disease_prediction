import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function PetDashboard() {
    const [pets, setPets] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pets");
            setPets(response.data);
        } catch (error) {
            alert("Error fetching pets");
            console.error("Fetch Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/pets/delete/${id}`);
            alert("Pet deleted successfully");
            fetchPets();
        } catch (error) {
            alert("Error deleting pet");
            console.error("Delete Error:", error);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/pets/search/${searchKey}`);
            setPets(response.data);
        } catch (error) {
            alert("Error searching pets");
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Pet Adoption</h2>
                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/add-pet">Add Pet</Link>
                    <Link to="/reports">Reports</Link>
                </nav>
            </aside>
            <main className="main-content">
                <h1>All Pets</h1>
                <form onSubmit={handleSearch} className="search-form">
                    <input type="search" placeholder="Search by name, gender, or birthday" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
                <table className="pet-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Birthday</th>
                            <th>Gender</th>
                            <th>Medical History</th>
                            <th>Profile Photo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet, index) => (
                            <tr key={pet._id}>
                                <td>{index + 1}</td>
                                <td>{pet.name}</td>
                                <td>{new Date(pet.birthday).toLocaleDateString()}</td>
                                <td>{pet.gender}</td>
                                <td>{pet.medicalHistory || 'N/A'}</td>
                                <td><img src={pet.profilePhoto} alt={pet.name} className="pet-img" /></td>
                                <td>
                                    <Link to={`/edit-pet/${pet._id}`} className="btn-edit">Edit</Link>
                                    <button onClick={() => handleDelete(pet._id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
