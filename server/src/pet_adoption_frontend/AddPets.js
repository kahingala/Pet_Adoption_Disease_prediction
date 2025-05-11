import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Sidebar = () => (
    <div className="sidebar">
        <h2>Pet Dashboard</h2>
        <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/add-pet">Add Pet</Link></li>
        </ul>
    </div>
);

const Dashboard = () => {
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Pets");
            setPets(response.data);
        } catch (error) {
            console.error("Error fetching pets", error);
        }
    };

    const deletePet = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Pets/delete/${id}`);
            fetchPets();
        } catch (error) {
            console.error("Error deleting pet", error);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                <h1>All Pets</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birthday</th>
                            <th>Gender</th>
                            <th>Medical History</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map(pet => (
                            <tr key={pet._id}>
                                <td>{pet.name}</td>
                                <td>{new Date(pet.birthday).toLocaleDateString()}</td>
                                <td>{pet.gender}</td>
                                <td>{pet.medicalHistory}</td>
                                <td>
                                    <button onClick={() => navigate(`/edit-pet/${pet._id}`)}>Edit</button>
                                    <button onClick={() => deletePet(pet._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AddPet = () => {
    const [formData, setFormData] = useState({
        name: '', birthday: '', gender: '', medicalHistory: '', profilePhoto: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePhoto: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        
        try {
            await axios.post("http://localhost:5000/Pets/add", data);
            navigate("/");
        } catch (error) {
            console.error("Error adding pet", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Pet</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="date" name="birthday" onChange={handleChange} required />
                <select name="gender" onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <textarea name="medicalHistory" placeholder="Medical History" onChange={handleChange}></textarea>
                <input type="file" name="profilePhoto" onChange={handleFileChange} />
                <button type="submit">Add Pet</button>
            </form>
        </div>
    );
};

const EditPet = ({ petId }) => {
    const [formData, setFormData] = useState({ name: '', birthday: '', gender: '', medicalHistory: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPet = async () => {
            const response = await axios.get(`http://localhost:5000/pets/get/${petId}`);
            setFormData(response.data.pet);
        };
        fetchPet();
    }, [petId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/pets/update/${petId}`, formData);
            navigate("/");
        } catch (error) {
            console.error("Error updating pet", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Pet</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange}></textarea>
                <button type="submit">Update Pet</button>
            </form>
        </div>
    );
};

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-pet" element={<AddPet />} />
            <Route path="/edit-pet/:id" element={<EditPet />} />
        </Routes>
    </Router>
);

export default App;
