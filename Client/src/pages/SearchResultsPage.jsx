import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PlantCard from '../components/PlantCard';
import { Link } from 'react-router-dom';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const nameQuery = searchParams.get('q');
  const ailmentQuery = searchParams.get('ailment');
  
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let apiUrl = 'http://localhost:5000/api/plants?';
    
    // Check if the search is for a name or an ailment
    if (nameQuery) {
      apiUrl += `q=${nameQuery}`;
      setTitle(`Search Results for: "${nameQuery}"`);
    } else if (ailmentQuery) {
      apiUrl += `ailment=${ailmentQuery}`;
      setTitle(`Plants that may help with: "${ailmentQuery}"`);
    } else {
      setTitle('No search criteria provided.');
      setIsLoading(false);
      return; // Stop if there are no search queries
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchResults();
  }, [nameQuery, ailmentQuery]); // Re-run if either query changes

  return (
    <div className="min-h-screen bg-green-50/50 font-sans">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-grow p-8">
            <Link to={-1} className="text-green-700 hover:underline mb-6 inline-block">
              &larr; Back
            </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            {title}
          </h1>
          
          {isLoading ? (
            <p>Loading results...</p>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {searchResults.map(plant => (
                <PlantCard key={plant._id} plant={plant} />
              ))}
            </div>
          ) : (
            <p>No plants found matching your criteria.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResultsPage;