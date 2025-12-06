import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CategoryCard from '../components/CategoryCard';

function HomePage() {
  // State to hold the text from the new ailment search bar
  const [ailmentTerm, setAilmentTerm] = useState('');
  const navigate = useNavigate();

  // Function to handle the search when the form is submitted
  const handleAilmentSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    if (ailmentTerm.trim()) {
      // Navigate to the search results page with an 'ailment' query
      navigate(`/search?ailment=${ailmentTerm}`);
    }
  };

  return (
    <div className="min-h-screen bg-green-50/50 font-sans">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-grow p-8">

          {/* --- NEW AILMENT SEARCH FORM --- */}
          <div className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleAilmentSearch}>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Find a Plant for Your Wellness Need
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="e.g., cough, stress, digestion..."
                  value={ailmentTerm}
                  onChange={(e) => setAilmentTerm(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button type="submit" className="bg-green-700 text-white px-6 py-2 rounded-r-md hover:bg-green-800 font-semibold">
                  Search
                </button>
              </div>
            </form>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Or Browse by Category</h2>
          <div className="flex flex-col gap-8">
            <Link to="/category/Culinary" className="no-underline">
              <CategoryCard title="Culinary" />
            </Link>
            <Link to="/category/Medicinal" className="no-underline">
              <CategoryCard title="Medicinal" />
            </Link>
            <Link to="/category/Aromatic" className="no-underline">
              <CategoryCard title="Aromatic" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;