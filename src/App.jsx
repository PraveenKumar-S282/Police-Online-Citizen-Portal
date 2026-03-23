import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AlertBanner from './components/AlertBanner';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Complaint from './pages/Complaint';
import FIRStatus from './pages/FIRStatus';
import Profile from './pages/Profile';
import LostDocument from './pages/LostDocument';
import VehicleEnquiry from './pages/VehicleEnquiry';
import MissingPersons from './pages/MissingPersons';
import PoliceVerification from './pages/PoliceVerification';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="loader glass">Setting up your secure session...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="app-container">
      <AlertBanner />
      <Navbar />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/complaint" 
            element={
              <ProtectedRoute>
                <Complaint />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/status" 
            element={
              <ProtectedRoute>
                <FIRStatus />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lost-report" 
            element={
              <ProtectedRoute>
                <LostDocument />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vehicle-enquiry" 
            element={
              <ProtectedRoute>
                <VehicleEnquiry />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/missing-persons" 
            element={
              <ProtectedRoute>
                <MissingPersons />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/verification" 
            element={
              <ProtectedRoute>
                <PoliceVerification />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" replace /> : <Register />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
