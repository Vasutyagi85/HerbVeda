import React, { useState } from 'react';

const Accordion = ({ herbData }) => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    { 
      id: 'description', 
      title: 'Detailed Description', 
      content: herbData.description 
    },
    { 
      id: 'howToUse', 
      title: 'How to Use & Dosage', 
      content: herbData.howToUse 
    },
    { 
      id: 'benefits', 
      title: 'Health Benefits', 
      content: herbData.benefits 
    },
    { 
      id: 'precautions', 
      title: 'Safety & Precautions', 
      content: herbData.precautions 
    },
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="border border-green-100 rounded-xl overflow-hidden shadow-sm">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-green-50 last:border-none">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex justify-between items-center p-5 bg-green-50/30 hover:bg-green-50 transition-colors text-left"
          >
            <span className="font-bold text-slate-800 uppercase tracking-wide text-sm">
              {section.title}
            </span>
            <span className={`transform transition-transform duration-300 ${openSection === section.id ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          
          {openSection === section.id && (
            <div className="p-6 bg-white animate-in fade-in slide-in-from-top-1 duration-200">
              {/* THE FIX: whitespace-pre-line ensures \n creates a new line */}
              <div className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
                {section.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;