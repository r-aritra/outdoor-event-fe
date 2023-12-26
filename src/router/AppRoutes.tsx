import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BatchEventApprove from '../features/BatchEventApprove';
import BatchEventRegister from '../features/BatchEventRegister';
import BatchEventResults from '../features/BatchEventResults';
import Home from '../features/Home';
import Login from '../features/Login';
import Signup from '../features/Signup';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/batch-event/results" element={<BatchEventResults />} />
        <Route path="/batch-event/register" element={<BatchEventRegister />} />
        <Route path="/batch-event/approve" element={<BatchEventApprove />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
