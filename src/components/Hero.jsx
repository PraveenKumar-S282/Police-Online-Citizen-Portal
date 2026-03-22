import React from 'react';
import { Search, MapPin, PhoneCall, ShieldCheck, FileText, MonitorCheck, ShieldAlert, Car, UserSearch, Download, Users, FileSignature, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const services = [
  { title: 'Register Online Complaint', path: '/complaint', icon: <FileText size={18} /> },
  { title: 'View FIR Status', path: '/status', icon: <MonitorCheck size={18} /> },
  { title: 'CSR Status', path: '/status', icon: <ShieldAlert size={18} /> },
  { title: 'Vehicle Enquiry', path: '/vehicle-enquiry', icon: <Car size={18} /> },
  { title: 'Missing Persons', path: '/missing-persons', icon: <UserSearch size={18} /> },
  { title: 'Download FIR / CSR', path: '/status', icon: <Download size={18} /> },
  { title: 'Police Verification', path: '/verification', icon: <Users size={18} /> },
  { title: 'Lost Document Report', path: '/lost-report', icon: <FileSignature size={18} /> },
];

const Hero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [filtered, setFiltered] = React.useState([]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      const matches = services.filter(s => s.title.toLowerCase().includes(val.toLowerCase()));
      setFiltered(matches);
    } else {
      setFiltered([]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      navigate(filtered[0].path);
      setQuery('');
      setFiltered([]);
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-overlay" onClick={() => setFiltered([])}></div>
      <div className="container hero-content">
        <div className="hero-text animate-fade-in delay-1">
          <h1 className="hero-title">
            <span className="text-gradient">Protecting Citizens.</span> <br />
            <span className="text-gradient-gold">Upholding Law.</span>
          </h1>
          <p className="hero-subtitle">
            Welcome to the centralized Citizen Portal. Access online services, register complaints securely, and join hands with us to create a safer tomorrow.
          </p>

          <div className="search-container">
            <div className="search-box glass">
              <Search size={20} color="#8892b0" />
              <input 
                type="text" 
                placeholder="Search for Services, FIR, Cyber Forms..." 
                className="search-input"
                value={query}
                onChange={handleSearchChange}
                onKeyDown={onKeyDown}
              />
              <button className="btn-primary" onClick={() => filtered.length > 0 && navigate(filtered[0].path)}>Search</button>
            </div>

            {filtered.length > 0 && (
              <div className="search-dropdown glass-card animate-scale-up">
                {filtered.map((s, idx) => (
                  <div key={idx} className="search-item" onClick={() => { navigate(s.path); setQuery(''); setFiltered([]); }}>
                    <div className="s-info">
                      {s.icon}
                      <span>{s.title}</span>
                    </div>
                    <div className="s-tag">Go to Page <ArrowRight size={14} /></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="quick-stats fade-in delay-3">
            <div className="stat-item">
              <ShieldCheck size={28} className="stat-icon" />
              <div>
                <h4>24/7</h4>
                <p>Online Support</p>
              </div>
            </div>
            <div className="stat-item">
              <MapPin size={28} className="stat-icon" />
              <div>
                <h4>150+</h4>
                <p>Police Stations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-action-cards animate-fade-in delay-2">
          <div className="glass-card em-card">
            <div className="em-header">
              <PhoneCall size={24} color="#ef4444" />
              <h3>Emergency Dial</h3>
            </div>
            <div className="em-numbers">
              <div className="em-num-box">
                <span className="em-label">Police</span>
                <span className="em-val text-gradient-gold">100 / 112</span>
              </div>
              <div className="em-num-box">
                <span className="em-label">Cyber Crime</span>
                <span className="em-val">1930</span>
              </div>
              <div className="em-num-box">
                <span className="em-label">Women Helpline</span>
                <span className="em-val">1091</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
