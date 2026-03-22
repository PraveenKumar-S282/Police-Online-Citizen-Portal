import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User, Phone, Globe, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo-section">
          <div className="shield-icon">
            <Shield size={32} color="#FACC15" fill="rgba(250, 204, 21, 0.2)" />
          </div>
          <div className="logo-text">
            <h2>STATE POLICE</h2>
            <span className="subtitle">Citizen Portal</span>
          </div>
        </Link>

        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' && !location.hash ? 'active' : ''}>Home</Link></li>
          <li><Link to="/#about" className={location.hash === '#about' ? 'active' : ''}>About Us</Link></li>
          <li><Link to="/#services" className={location.hash === '#services' ? 'active' : ''}>Online Services</Link></li>
          <li><Link to="/#cyber" className={location.hash === '#cyber' ? 'active' : ''}>Cyber Crime</Link></li>
          <li><Link to="/#contact" className={location.hash === '#contact' ? 'active' : ''}>Contact Us</Link></li>
          
          <div className="nav-actions-mobile">
            <button className="btn-outline"><Globe size={18} /> EN</button>
            {user ? (
              <>
                <Link to="/profile" className="btn-outline" style={{ display: 'inline-flex' }}><User size={18} /> My Profile</Link>
                <button className="btn-primary" onClick={handleLogout} style={{ display: 'inline-flex' }}><LogOut size={18} /> Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn-primary" style={{ display: 'inline-flex' }}><User size={18} /> Login / Register</Link>
            )}
          </div>
        </ul>

        <div className="nav-actions">
           {user ? (
             <div className="user-nav-group">
               <Link to="/profile" className="profile-link" title="My Profile"><User size={20} /> {user.fullName?.split(' ')[0]}</Link>
               <button className="logout-icon-btn" onClick={handleLogout} title="Logout"><LogOut size={20} /></button>
             </div>
           ) : (
             <Link to="/login" className="btn-primary" style={{ display: 'inline-flex' }}><User size={18} /> Login / Register</Link>
           )}
        </div>

        <button 
          className="mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
