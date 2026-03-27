import React from 'react';
import { Camera, Upload, X } from 'lucide-react';

const ImageUploader = ({ onImageSelect, selectedImage, clearImage }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Pass both the Preview URL and the Base64 string back to the parent
        onImageSelect(URL.createObjectURL(file), reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <div className="aspect-square bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100 flex items-center justify-center overflow-hidden relative transition-all group-hover:border-green-200">
        {selectedImage ? (
          <>
            <img src={selectedImage} className="w-full h-full object-cover" alt="Selected Plant" />
            <button 
              onClick={clearImage}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <div className="text-center px-6">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4 inline-block text-gray-200 group-hover:text-green-500 transition-colors">
              <Camera size={48} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Drop leaf photo here</p>
            <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Supports JPG, PNG</p>
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

export default ImageUploader;