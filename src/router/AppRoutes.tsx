import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../features/Login/Login';
import Signup from '../features/Signup/Signup';
import AppLayout from '../layout/AppLayout';

const isAuthenticated = true;

const AppRoutes: React.FC = () => {
  return (
    <Router>
      {isAuthenticated ? (
        <AppLayout />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </Router>
  );
};

export default AppRoutes;
