import React, { useState } from "react";

const Sidebarr = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close
  const [isChartsOpen, setIsChartsOpen] = useState(false); // Submenu

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-green-100/70 border-r border-green-200 min-h-screen p-4 flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-6 text-green-800 font-bold"
        >
        {isOpen ? "Close ⬅" : "☰"}
        </button>

        {/* Menu Items */}
        <div className="flex flex-col space-y-2">
          {/* Collapsible Submenu */}
          <button
            onClick={() => setIsChartsOpen(!isChartsOpen)}
            className="flex items-center justify-between w-full text-left text-green-700 font-medium py-2 px-3 rounded hover:bg-green-200 transition"
          >
            {isOpen && "Charts"}
            {isOpen && (isChartsOpen ? "▼" : "▶")}
          </button>

          {/* Submenu Items */}
          {isChartsOpen && isOpen && (
            <div className="ml-4 mt-1 flex flex-col space-y-1">
              <button className="block w-full text-left text-green-600 hover:text-green-800 hover:bg-green-100 rounded px-3 py-1 transition">
                Pie Charts
              </button>
              <button className="block w-full text-left text-green-600 hover:text-green-800 hover:bg-green-100 rounded px-3 py-1 transition">
                Line Charts
              </button>
            </div>
          )}

          {/* Static Menu Items */}
          <button className="block w-full text-left text-green-700 hover:bg-green-200 rounded px-3 py-2 transition">
            {isOpen && "Documentation"}
          </button>
          <button className="block w-full text-left text-green-700 hover:bg-green-200 rounded px-3 py-2 transition">
            {isOpen && "Calendar"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Explore the Garden</h1>
        {/* You can add your grid/cards here */}
      </div>
    </div>
  );
};

export default Sidebarr;

