import React, { useState, useEffect } from 'react';
import NurseryCard from './components/NurseryCard';
import { MapPin, Navigation } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('herbs');
  const [nurseries, setNurseries] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "pk.3982769ee6472a3fb16d20bb8844efc2"; // Replace with your real key

  const fetchNearbyNurseries = async (lat, lng) => {
    setLoading(true);
    try {
      // LocationIQ Nearby API uses OpenStreetMap tags. 
      // 'landuse:nursery' or 'shop:garden_centre' are common for plant nurseries.
      const response = await fetch(
        `https://us1.locationiq.com/v1/nearby?key=${API_KEY}&lat=${lat}&lon=${lng}&radius=5000&tag=shop:garden_centre&format=json`
      );
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setNurseries(data);
      } else {
        setNurseries([]); // Handle case where no nurseries are found
      }
    } catch (error) {
      console.error("Error fetching nurseries:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        fetchNearbyNurseries(latitude, longitude);
      });
    }
  };

  // Automatically try to get location when switching to the nursery tab
  useEffect(() => {
    if (activeTab === 'nurseries' && !userCoords) {
      getLocation();
    }
  }, [activeTab]);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen font-sans pb-20">
      {/* Tab Switcher */}
      <div className="flex border-b sticky top-0 bg-white z-20 shadow-sm">
        <button 
          onClick={() => setActiveTab('herbs')}
          className={`flex-1 py-4 text-sm font-black uppercase tracking-wider ${activeTab === 'herbs' ? 'text-green-700 border-b-4 border-green-700' : 'text-gray-400'}`}
        >
          Explore Herbs
        </button>
        <button 
          onClick={() => setActiveTab('nurseries')}
          className={`flex-1 py-4 text-sm font-black uppercase tracking-wider ${activeTab === 'nurseries' ? 'text-green-700 border-b-4 border-green-700' : 'text-gray-400'}`}
        >
          Nearby Nursery
        </button>
      </div>

      <div className="mt-2">
        {activeTab === 'herbs' ? (
          <div className="p-4 grid grid-cols-2 gap-4">
            {/* Your Herb Grid Component Here */}
          </div>
        ) : (
          <div className="flex flex-col animate-fadeIn">
            {/* Location Header */}
            <div className="p-4 flex items-center justify-between bg-green-50/50">
              <div className="flex items-center gap-2">
                <Navigation size={18} className="text-orange-500 fill-orange-500" />
                <span className="font-bold text-gray-700 truncate w-48">
                  {userCoords ? "Finding Green Spaces..." : "Detecting Location"}
                </span>
              </div>
              <button onClick={getLocation} className="text-xs font-black text-green-700 border-2 border-green-700 px-3 py-1 rounded-full hover:bg-green-700 hover:text-white transition-colors">
                REFRESH
              </button>
            </div>

            {loading ? (
               <div className="p-10 text-center font-bold text-gray-400">Searching for nurseries...</div>
            ) : nurseries.length > 0 ? (
              nurseries.map((nursery, index) => (
                <NurseryCard 
                  key={index} 
                  nursery={{
                    name: nursery.name || "Local Garden Center",
                    distance: `${(nursery.distance / 1000).toFixed(1)} km`,
                    rating: (Math.random() * (5 - 3.8) + 3.8).toFixed(1), // Mock rating as OSM doesn't always provide it
                    specialty: nursery.type || "Plants & Seeds",
                    address: nursery.display_name,
                    image: `https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=400&sig=${index}` // Dynamic unsplash
                  }} 
                />
              ))
            ) : (
              <div className="p-10 text-center text-gray-500 italic">
                No nurseries found within 5km. Try clicking refresh or changing location.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;