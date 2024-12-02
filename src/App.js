import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ChecklistPage from './components/ChecklistPage';
import FarmerProfilePage from './components/FarmProfilePage';
import LandingPage from './components/LandingPage';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Set the page title based on the current route
    switch (location.pathname) {
      case '/':
        document.title = 'Application Checklist - Khula';
        break;
      case '/farmer-profile':
        document.title = 'Farmer Profile - Khula';
        break;
      case '/landing-continue-khula':
        document.title = 'Continue Your Application - Khula';
        break;
      default:
        document.title = 'Khula Platform';
        break;
    }
  }, [location.pathname]);

  return (
    <>
      {/* Render Header for all routes except "/farmer-profile" */}
      {location.pathname !== '/farmer-profile' && <Header />}
      <Routes>
        <Route path="/" element={<ChecklistPage />} />
        <Route path="/farmer-profile" element={<FarmerProfilePage />} />
        <Route path="/landing-continue-khula" element={<LandingPage />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
