import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import BatchEventApprove from '../features/BatchEventApprove';
import BatchEventRegister from '../features/BatchEventRegister';
import BatchEventResults from '../features/BatchEventResults';
import Home from '../features/Home';
import Login from '../features/Login';
import Signup from '../features/Signup';

const isAuthenticated = false;

const PrivateRoutes = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/batch-event/results" element={<BatchEventApprove />} />
          <Route path="/batch-event/register" element={<BatchEventRegister />} />
          <Route path="/batch-event/approve" element={<BatchEventResults />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
