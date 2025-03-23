import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/pets")
      .then(response => setPets(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-orange-500 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Find Your Best Friend at the Animal Shelter</h1>
        <p className="mt-2 text-lg">Your trusted partner in pet adoption, health, and happiness.</p>
      </div>

      {/* Pet Listings */}
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Available Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet._id} className="bg-white shadow-md p-4 rounded-lg">
              <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-bold mt-4">{pet.name}</h3>
              <p className="text-gray-600">{pet.description}</p>
              <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Adopt Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
