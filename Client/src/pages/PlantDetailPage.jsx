import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const PlantDetailPage = () => {
  const { id } = useParams(); // Get the plant ID from the URL
  const [plant, setPlant] = useState(null); // State to hold the plant data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/plants/${id}`);
        const data = await response.json();
        setPlant(data);
      } catch (error) {
        console.error("Failed to fetch plant:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]); // Re-run the effect if the ID in the URL changes

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching
  }

  if (!plant) {
    return <div>Plant not found.</div>;
  }

  return (
    <div className="min-h-screen bg-green-50/50 font-sans">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-grow p-8">
          {/* Back Button */}
          <Link to={-1} className="text-green-700 hover:underline mb-6 inline-block">&larr; Back to list</Link>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-2">{plant.name}</h1>
          <p className="text-xl text-gray-500 italic mb-8">{plant.scientificName}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Plant Image */}
            <div className="w-full">
              <img 
                src={plant.imageUrl || 'https://via.placeholder.com/800x600'} 
                alt={plant.name}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
            {/* 3D Model Placeholder */}
            <div className="w-full h-96 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-gray-500 text-2xl">3D Model Placeholder</p>
            </div>
          </div>

          {/* Plant Description */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{plant.description}</p>
            
            <h2 className="text-3xl font-bold text-gray-700 mt-6 mb-4">Medicinal Use</h2>
            <p className="text-gray-600 leading-relaxed">{plant.medicinalUse}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlantDetailPage;