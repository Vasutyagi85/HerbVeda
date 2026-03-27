import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('ailment') || searchParams.get('q');
  const [searchTerm, setSearchTerm] = useState(query || '');

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/api/plants';
        if (query) {
           url = `http://localhost:5000/api/plants/search?query=${query}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setPlants(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="flex-1 p-8 bg-green-50/50 min-h-screen">
      <button 
         onClick={() => navigate(-1)} 
         className="text-green-600 hover:text-green-800 mb-4 flex items-center gap-1 font-semibold"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {query ? `Results for "${query}"` : "All Plants"}
        </h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 bg-white"
          />
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Loading your garden...</div>
      ) : plants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <Link to={`/plant/${plant._id}`} key={plant._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-green-100 flex flex-col group">
              <div className="h-48 overflow-hidden bg-gray-200">
                <img 
                  src={plant.image} 
                  alt={plant.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-green-900 mb-1">{plant.name}</h3>
                <p className="text-sm text-gray-500 italic mb-2">{plant.scientificName}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {plant.ailments && plant.ailments.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 italic">No plants found matching your criteria.</p>
          <button onClick={() => navigate('/search')} className="mt-4 text-green-600 underline font-bold">
            View all plants
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;