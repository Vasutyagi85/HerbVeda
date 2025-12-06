import React from 'react';
import navbarbg from "../assets/navbarbg.jpg"

const Navbar = () => {
  return (
    <nav className="w-full h-44 bg-cover bg-no-repeat flex items-center text-white p-4 shadow-md"
     style={{ backgroundImage: `url(${navbarbg})` }}
    >
      <h1 className="text-2xl font-bold">🌿 HerbVeda</h1>
    </nav>
  );
};

export default Navbar;