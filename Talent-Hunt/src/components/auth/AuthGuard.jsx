// src/components/auth/AuthGuard/AuthGuard.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '../common';

const AuthGuard = ({ children }) => {
  const { status: isLoggedIn } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // A short delay to ensure auth state is fully loaded
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        // Redirect to login page with return URL
        navigate('/login', { 
          state: { returnUrl: location.pathname } 
        });
      }
      setChecking(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate, location]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // If authenticated, render children
  return isLoggedIn ? children : null;
};

export default AuthGuard;