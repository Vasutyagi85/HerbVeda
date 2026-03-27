import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for the auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // We know the status now, stop loading
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show a loading spinner while checking with Firebase
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-800 font-bold">
        Checking your credentials...
      </div>
    );
  }

  // If user is not logged in, redirect to Login Page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, show the actual page (children)
  return children;
};

export default ProtectedRoute;