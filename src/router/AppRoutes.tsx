import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import BatchEventApprove from '../features/BatchEventApprove/BatchEventApprove';
import BatchEventRegister from '../features/BatchEventRegister/BatchEventRegister';
import BatchEventResults from '../features/BatchEventResults/BatchEventResults';
import Home from '../features/Home/Home';
import Login from '../features/Login/components/pages/Login';
import Signup from '../features/Signup/components/pages/Signup';

const isAuthenticated = localStorage.getItem('accessToken');

const PrivateRoutes = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/batch-event/results" element={<BatchEventApprove />} />
          <Route path="/batch-event/register" element={<BatchEventRegister />} />
          <Route path="/batch-event/approve" element={<BatchEventResults />} />
        </Route>

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
