import React from 'react';

const NurseryMap = ({ userLocation }) => {
  // 1. Show loading state if location isn't ready
  if (!userLocation || !userLocation.lat) {
    return (
      <div className="p-10 bg-gray-100 rounded-2xl text-center border-2 border-dashed border-gray-300">
        <p className="text-gray-500 animate-pulse font-medium">📡 Acquiring GPS Signal...</p>
      </div>
    );
  }

  // 2. Corrected Template Literal (using backticks and ${} )
  // We add 'nursery' to the query so it shows pins on the map
  const mapEmbedUrl = `https://maps.google.com/maps?q=nursery&ll=${userLocation.lat},${userLocation.lng}&z=14&output=embed`;

  return (
    <div className="mt-6 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-green-100 relative">
      <div className="relative w-full h-[500px]">
        <iframe
          title="Nursery Locator"
          width="100%"
          height="100%"
          frameBorder="0"
          src={mapEmbedUrl}
          className="filter grayscale-[20%] contrast-110"
        ></iframe>
      </div>
      
      {/* Professional Overlay Bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl flex justify-between items-center shadow-lg border border-green-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
            Live GPS: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </span>
        </div>
        <a 
          href={`https://www.google.com/maps/search/nursery/@${userLocation.lat},${userLocation.lng},15z`}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-green-700 transition-transform active:scale-95"
        >
          OPEN IN GOOGLE MAPS ↗
        </a>
      </div>
    </div>
  );
};

export default NurseryMap;