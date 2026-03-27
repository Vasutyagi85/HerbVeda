import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Accordion from '../components/Accordion'; 
import NurseryMap from '../components/NurseryMap'; 

const PlantDetailPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/plants/${id}`);
        const data = await response.json();
        setPlant(data);
      } catch (error) {
        console.error("Error fetching herb:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  const handleFindNursery = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowMap(true);
        },
        (error) => alert("Please enable location permissions.")
      );
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-green-700">Loading Veda Intelligence...</div>;
  if (!plant) return <div className="p-20 text-center text-red-500">Plant data not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="flex">
        <main className="flex-grow p-8">
          <Link to={-1} className="text-green-700 hover:underline mb-8 inline-block font-bold">
            ← Back to Library
          </Link>
          
          <div className="mb-12">
            <h1 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">{plant.name}</h1>
            <p className="text-2xl text-green-600 italic font-serif opacity-70">
              {plant.scientificName || plant.SceintificName}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <img 
              src={plant.imageUrl || 'https://via.placeholder.com/800'} 
              alt={plant.name}
              className="w-full h-[450px] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
            />
            <div className="h-[450px] bg-slate-200 rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-slate-300">
               <p className="text-slate-400 font-bold uppercase tracking-widest italic">3D Spatial View</p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 max-w-5xl">
            <h2 className="text-3xl font-black text-slate-800 mb-8 border-l-8 border-green-500 pl-5 uppercase tracking-tight">
              Medicinal Intelligence
            </h2>
            
            <Accordion herbData={plant} />

            <div className="mt-12 pt-10 border-t border-slate-100 text-center md:text-left">
              <button 
                onClick={handleFindNursery}
                className="bg-green-600 text-white px-10 py-5 rounded-full font-black text-lg shadow-lg hover:bg-green-700 hover:shadow-green-100 transition-all active:scale-95 uppercase tracking-widest"
              >
                📍 FIND {plant.name} NEARBY
              </button>

              {showMap && userLocation && (
                <div className="mt-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                  <h3 className="text-2xl font-black text-slate-800 mb-6 italic">Nearby Botanical Centers:</h3>
                  <NurseryMap userLocation={userLocation} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlantDetailPage;