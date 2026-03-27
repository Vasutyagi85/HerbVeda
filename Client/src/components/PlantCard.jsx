import React from 'react';
import { Link } from 'react-router-dom';

const PlantCard = ({ plant }) => {
  // Use plant.image if your backend returns 'image', otherwise fallback to plant.imageUrl
  const displayImage = plant.image || plant.imageUrl || 'https://via.placeholder.com/400x300';

  return (
    <Link to={`/plant/${plant._id}`} className="group">
      <div className="bg-white rounded-2xl shadow-sm border border-green-50 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        
        {/* Image Container with Zoom Effect */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={displayImage} 
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {plant.category && (
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-green-700 text-[10px] font-black uppercase px-2 py-1 rounded-lg shadow-sm border border-green-100">
                {plant.category}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-extrabold text-gray-800 group-hover:text-green-700 transition-colors">
            {plant.name}
          </h3>
          <p className="text-xs text-green-600 font-medium italic mb-2">
            {plant.scientificName}
          </p>
          
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {plant.description || "Discover the herbal benefits and traditional uses of this plant in our garden."}
          </p>
          
          {/* Decorative Footer */}
          <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>View Details</span>
            <span className="text-green-500">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;