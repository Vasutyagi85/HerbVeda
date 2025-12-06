import React from 'react';
import { Link } from 'react-router-dom';

const PlantCard = ({ plant }) => {
  return (
    <Link to={`/plant/${plant._id}`}>
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img 
        src={plant.imageUrl || 'https://via.placeholder.com/400x300'} 
        alt={plant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{plant.name}</h3>
        <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
        <p className="mt-2 text-sm text-gray-600">{plant.medicinalUse.substring(0, 100)}...</p>
      </div>
    </div>
    </Link>
  );
};

export default PlantCard;