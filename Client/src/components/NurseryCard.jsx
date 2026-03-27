import React from 'react';
import { Star } from 'lucide-react';

const NurseryCard = ({ nursery }) => {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer rounded-xl group">
      {/* Image Section */}
      <div className="relative flex-shrink-0">
        <img 
          src={nursery.image} 
          alt={nursery.name} 
          className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-md text-[10px] font-black text-green-700">
          {nursery.deliveryTime}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-800 truncate leading-tight">
          {nursery.name}
        </h3>
        
        <div className="flex items-center gap-1 mt-1">
          <div className="bg-green-600 p-0.5 rounded-full flex items-center justify-center">
            <Star size={10} className="text-white fill-current" />
          </div>
          <span className="text-sm font-bold text-gray-700">{nursery.rating}</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm font-bold text-gray-600">{nursery.distance}</span>
        </div>

        <p className="text-gray-500 text-sm mt-1 line-clamp-1 italic">
          {nursery.specialty}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-black uppercase tracking-wider border border-orange-100">
            Free Delivery
          </span>
          <span className="text-[10px] text-gray-400 font-medium truncate ml-2">
            {nursery.address.split(',')[1] || "Greater Noida"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NurseryCard;