import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import herbImage from '../assets/herb_background.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); 
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${herbImage})` }}
    >
      {/* 1. Dark Overlay (Makes the text pop) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* 2. Login Card (Centered) */}
      <div className="relative z-10 bg-white/90 p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-white/50 backdrop-blur-md">
        
        {/* Logo or Icon */}
        <div className="text-6xl mb-6 drop-shadow-md">🌿</div>
        
        <h1 className="text-4xl font-bold text-green-900 mb-2 font-serif">HerbVeda</h1>
        <p className="text-gray-600 mb-8 font-medium">Your Gateway to Natural Healing</p>
        
        <button 
          onClick={handleLogin}
          className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-sm"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-6 h-6" 
          />
          Sign in with Google
        </button>

        <p className="mt-6 text-xs text-gray-500">
          By signing in, you agree to explore nature responsibly.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;