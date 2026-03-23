import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, UserCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      
      <div className="auth-card glass-card animate-fade-in">
        <div className="auth-header">
          <div className="auth-logo">
            <Shield size={36} color="#FACC15" />
          </div>
          <h2>Citizen Login</h2>
          <p>Access your portal to register or track complaints securely.</p>
        </div>

        {error && (
          <div className="error-message glass">
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email Address / Phone</label>
            <div className="input-wrapper">
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="Enter registered email or phone"
                value={formData.email}
                onChange={handleChange}
                autoCapitalize="none"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="label-container">
              <label htmlFor="password">Password</label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <div className="input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit">
            Secure Login <UserCheck size={18} />
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register" className="auth-link">Register Now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
