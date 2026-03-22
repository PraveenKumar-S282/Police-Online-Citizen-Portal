import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, IdCard, Phone, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    aadharNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const result = await register(formData);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background register-bg"></div>
      
      <div className="auth-card glass-card animate-fade-in register-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Shield size={36} color="#FACC15" />
          </div>
          <h2>Citizen Registration</h2>
          <p>Create a secure account to access state police online services.</p>
        </div>

        {error && (
          <div className="error-message glass">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form registration-form">
          <div className="form-grid">
            <div className="input-group">
              <label>Full Name (As per Aadhar)</label>
              <div className="input-wrapper">
                <input type="text" name="fullName" placeholder="Enter full name" value={formData.fullName} onChange={handleChange} required />
                <User size={18} className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <input type="tel" name="phone" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} required />
                <Phone size={18} className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <input type="email" name="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} required />
                <Mail size={18} className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Aadhar / Identity Number</label>
              <div className="input-wrapper">
                <input type="text" name="aadharNumber" placeholder="12-digit UID" value={formData.aadharNumber} onChange={handleChange} required />
                <IdCard size={18} className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Create Password</label>
              <div className="input-wrapper">
                <input type="password" name="password" placeholder="At least 8 characters" value={formData.password} onChange={handleChange} required />
                <Lock size={18} className="input-icon" />
              </div>
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <input type="password" name="confirmPassword" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange} required />
                <Lock size={18} className="input-icon" />
              </div>
            </div>
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I verify that the above information is true and agree to the <a href="#" className="auth-link">Terms & Conditions</a>.</label>
          </div>

          <button type="submit" className="btn-primary auth-submit">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already registered? <Link to="/login" className="auth-link">Login Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
