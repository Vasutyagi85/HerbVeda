import React from 'react';
import Accordion from './Accordion';

const HerbDetails = ({ selectedHerb }) => {
  if (!selectedHerb) return <div>Select an herb to see details</div>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <img src={selectedHerb.image} alt={selectedHerb.name} style={{ width: '100%', borderRadius: '15px' }} />
      <h1 style={{ color: '#2d5a27', fontSize: '2rem' }}>{selectedHerb.name}</h1>
      
      {/* Passing the data into the Accordion component */}
      <Accordion herbData={selectedHerb} />
      
      <button style={{ marginTop: '30px', padding: '15px', backgroundColor: '#2d5a27', color: 'white', border: 'none', borderRadius: '50px', width: '100%', fontWeight: 'bold' }}>
        📍 Locate Nearby Nursery
      </button>
    </div>
  );
};

export default HerbDetails;