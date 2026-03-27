import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlantCard from '../components/PlantCard';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    const fetchAndFilterPlants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/plants');
        const allPlants = await response.json();
        const filtered = allPlants.filter(plant => 
          plant.category.toLowerCase() === categoryName.toLowerCase()
        );
        setFilteredPlants(filtered);
      } catch (error) {
        console.error("Failed to fetch plants:", error);
      }
    };
    fetchAndFilterPlants();
  }, [categoryName]);

  return (
    <div className="flex-1 p-8 bg-green-50/50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 capitalize">
        Plants: {categoryName}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPlants.map(plant => (
          <PlantCard key={plant._id} plant={plant} />
        ))}
      </div>
      {filteredPlants.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No plants found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;