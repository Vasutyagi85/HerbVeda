import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';

const HomePage = () => {
  const [ailmentTerm, setAilmentTerm] = useState('');
  const navigate = useNavigate();

  const handleAilmentSearch = (e) => {
    e.preventDefault();
    if (ailmentTerm.trim()) {
      navigate(`/search?ailment=${ailmentTerm}`);
    }
  };

  return (
    <div className="min-h-screen bg-green-50/50 font-sans">
      {/* 1. Top Navigation */}
      <Navbar />

      <div className="flex">
        {/* 2. MAIN CONTENT AREA ONLY */}
        {/* Sidebar is removed from here because it's in App.jsx */}
        <main className="flex-grow p-8 transition-all duration-300">
          
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Explore the Garden
          </h1>

          {/* --- Ailment Search Section --- */}
          <div className="mb-12 bg-white p-6 rounded-lg shadow-md border border-green-100">
            <form onSubmit={handleAilmentSearch}>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Find a Plant for Your Wellness Need
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., cough, stress, digestion..."
                  value={ailmentTerm}
                  onChange={(e) => setAilmentTerm(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button 
                  type="submit" 
                  className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 font-semibold transition"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          
          {/* --- Categories Section --- */}
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Or Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/category/Culinary" className="no-underline hover:scale-105 transition-transform">
              <CategoryCard title="Culinary" />
            </Link>
            <Link to="/category/Medicinal" className="no-underline hover:scale-105 transition-transform">
              <CategoryCard title="Medicinal" />
            </Link>
            <Link to="/category/Aromatic" className="no-underline hover:scale-105 transition-transform">
              <CategoryCard title="Aromatic" />
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
};

export default HomePage;