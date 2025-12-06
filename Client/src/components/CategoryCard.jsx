import React from 'react';

const CategoryCard = ({ title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-center items-center h-40">
      <h2 className="text-2xl font-bold text-green-700">{title}</h2>
      <p className="text-gray-600 mt-2">View all {title.toLowerCase()} plants.</p>
    </div>
  );
};

export default CategoryCard;
