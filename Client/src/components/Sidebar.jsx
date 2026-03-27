import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
// Import Lucide icons for a professional look
import { Home, MapPin, Camera, Leaf, Search, LogOut, ChevronRight, ChevronDown } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); 
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={`bg-green-100/70 border-r border-green-200 min-h-screen flex flex-col transition-all duration-300 sticky top-0 h-screen ${isOpen ? "w-64" : "w-20"}`}>
      <div className="p-4 flex justify-end">
        <button onClick={() => setIsOpen(!isOpen)} className="text-green-800 font-bold hover:bg-green-200 p-2 rounded-xl transition">
          {isOpen ? "⬅" : "☰"}
        </button>
      </div>

      <div className="flex flex-col space-y-2 px-3 flex-grow">
        {/* Garden Home */}
        <Link to="/" className="flex items-center text-green-700 hover:bg-green-200 rounded-2xl px-3 py-3 transition group">
          <Home size={20} className="group-hover:scale-110 transition-transform" />
          {isOpen && <span className="ml-3 font-bold text-xs uppercase tracking-widest">Garden Home</span>}
        </Link>

        {/* Nearby Nursery */}
        <Link to="/nearby-nurseries" className="flex items-center text-green-700 hover:bg-green-200 rounded-2xl px-3 py-3 transition group">
          <MapPin size={20} className="group-hover:scale-110 transition-transform" />
          {isOpen && <span className="ml-3 font-bold text-xs uppercase tracking-widest">Nearby Nursery</span>}
        </Link>

        {/* --- NEW: AI IDENTIFIER --- */}
        <Link to="/identify" className="flex items-center text-green-700 hover:bg-green-200 rounded-2xl px-3 py-3 transition group bg-green-200/50 border border-green-300/50">
          <Camera size={20} className="text-green-800 group-hover:scale-110 transition-transform" />
          {isOpen && <span className="ml-3 font-black text-xs uppercase tracking-widest text-green-800">AI Identifier</span>}
        </Link>

        {/* Categories Dropdown */}
        <div>
          <button onClick={() => { if (!isOpen) setIsOpen(true); setIsCategoriesOpen(!isCategoriesOpen); }} className="flex items-center w-full text-left text-green-700 hover:bg-green-200 rounded-2xl px-3 py-3 transition group">
            <Leaf size={20} className="group-hover:scale-110 transition-transform" />
            {isOpen && (
              <><span className="ml-3 font-bold flex-grow text-xs uppercase tracking-widest">Categories</span>
              {isCategoriesOpen ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}</>
            )}
          </button>
          {isCategoriesOpen && isOpen && (
            <div className="ml-9 mt-1 flex flex-col space-y-1 border-l-2 border-green-200 pl-4 py-2">
              <Link to="/category/Medicinal" className="text-green-600 hover:text-green-800 text-[10px] font-bold uppercase tracking-tighter transition py-1">Medicinal</Link>
              <Link to="/category/Culinary" className="text-green-600 hover:text-green-800 text-[10px] font-bold uppercase tracking-tighter transition py-1">Culinary</Link>
              <Link to="/category/Aromatic" className="text-green-600 hover:text-green-800 text-[10px] font-bold uppercase tracking-tighter transition py-1">Aromatic</Link>
            </div>
          )}
        </div>

        {/* Find a Plant */}
        <Link to="/search" className="flex items-center text-green-700 hover:bg-green-200 rounded-2xl px-3 py-3 transition group">
          <Search size={20} className="group-hover:scale-110 transition-transform" />
          {isOpen && <span className="ml-3 font-bold text-xs uppercase tracking-widest">Find a Plant</span>}
        </Link>
      </div>

      <div className="p-4 border-t border-green-200">
        <button onClick={handleLogout} className="flex items-center w-full text-red-600 hover:bg-red-50 rounded-2xl px-3 py-3 transition group">
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          {isOpen && <span className="ml-3 font-bold text-xs uppercase tracking-widest">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;