import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Loader2, Info, CheckCircle2, Search, Camera, X, AlertTriangle } from 'lucide-react';

// --- SUB-COMPONENT: ImageUploader ---
const ImageUploader = ({ onImageSelect, selectedImage, clearImage }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(URL.createObjectURL(file), reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <div className="aspect-square bg-green-50/50 rounded-[3rem] border-4 border-dashed border-green-100 flex items-center justify-center overflow-hidden relative transition-all hover:border-green-300">
        {selectedImage ? (
          <>
            <img src={selectedImage} className="w-full h-full object-cover" alt="Preview" />
            <button 
              onClick={(e) => { e.preventDefault(); clearImage(); }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all z-10"
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <div className="text-center p-6 cursor-pointer">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4 inline-block text-green-200 group-hover:text-green-500 transition-colors">
              <Camera size={48} />
            </div>
            <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mb-1">Upload Herb Photo</p>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Click or Drag & Drop</p>
          </div>
        )}
        <input 
          type="file" 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </div>
  );
};

// --- MAIN PAGE: Identify ---
const Identify = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (url, base64Str) => {
    setPreview(url);
    setBase64(base64Str);
    setResult(null); 
  };

  const clearImage = () => {
    setPreview(null);
    setBase64("");
    setResult(null);
  };

  const startAnalysis = async () => {
    if (!base64) return;
    setLoading(true);
    
    try {
      // 🔑 Replace with your actual Kindwise API Key
      const API_KEY = "NHkBSdvg8nsdgm7DE9IrArdLHWPS8D8lGjBPQzvp6o8HIA7JmG"; 
      
      const cleanBase64 = base64.includes(",") ? base64.split(",")[1] : base64;

      const response = await fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": API_KEY
        },
        body: JSON.stringify({
          images: [cleanBase64],
          organs: ["leaf", "flower", "fruit"],
          plant_details: ["common_names", "wiki_description"]
        })
      });

      if (!response.ok) throw new Error("API call rejected");

      const data = await response.json();
      if (data.suggestions && data.suggestions.length > 0) {
        setResult(data.suggestions[0]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("Error identifying plant. Ensure image is clear and API key is valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto bg-white min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">AI Botanical Scanner</h1>
        <p className="text-green-600 font-bold flex items-center gap-2 mt-2 uppercase text-[10px] tracking-widest">
          <Leaf size={14} fill="currentColor" /> Identifying 250,000+ Plant Species
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT SECTION */}
        <div className="space-y-8">
          <ImageUploader 
            onImageSelect={handleImageSelect} 
            selectedImage={preview} 
            clearImage={clearImage} 
          />
          
          <button 
            onClick={startAnalysis}
            disabled={!base64 || loading}
            className="w-full bg-green-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-green-700 disabled:bg-gray-100 disabled:text-gray-300 transition-all flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />}
            {loading ? "Analyzing Botanical DNA..." : "Scan This Plant"}
          </button>
        </div>

        {/* RIGHT SECTION (RESULTS) */}
        <div className="bg-green-50/40 rounded-[3.5rem] p-10 border border-green-100 min-h-[500px] flex flex-col justify-center relative">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              
              {/* Confidence Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${result.probability > 0.7 ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'}`}>
                  {(result.probability * 100).toFixed(0)}% Match
                </span>
                {result.probability < 0.7 && (
                  <span className="text-[9px] font-bold text-amber-700 flex items-center gap-1 uppercase tracking-tighter">
                    <AlertTriangle size={12} /> Low Confidence
                  </span>
                )}
              </div>
              
              <h2 className="text-5xl font-black text-gray-900 mb-2 tracking-tight capitalize">
                {result.plant_name}
              </h2>
              
              <p className="text-sm font-bold text-green-700 italic mb-10">
                Commonly known as: {result.plant_details?.common_names?.slice(0, 2).join(", ") || "No common names found"}
              </p>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-green-100 flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-2xl text-green-600"><Info size={24} /></div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Medicinal Context</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      Markers for {result.plant_name} identified. Search our database to see verified Ayurvedic uses.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/search?query=${encodeURIComponent(result.plant_name)}`)}
                  className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 mt-4"
                >
                  <Search size={18} /> Find in HerbVeda Store
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center opacity-20">
              <Leaf size={100} className="mx-auto mb-6 text-green-900" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-green-900">Awaiting visual input</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Identify;