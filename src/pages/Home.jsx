import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import { ShieldAlert, BookOpen, Users, PhoneCall } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If Home clicked or No Hash, go to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, location.pathname]);

  return (
    <>
      <Hero />
      
      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="about-content glass-card">
              <div className="section-header center">
                  <h2>Welcome to the <span>Directorate of Police</span></h2>
                  <p>A mission-driven organization committed to public safety and justice.</p>
              </div>
              <div className="features-grid">
                  <div className="feat-box">
                      <BookOpen size={32} color="var(--secondary)" />
                      <h3>Our History</h3>
                      <p>Serving the state for over 100 years with an unblemished record of devotion.</p>
                  </div>
                  <div className="feat-box">
                      <Users size={32} color="var(--secondary)" />
                      <h3>Our Vision</h3>
                      <p>Creating a crime-free state through technology and community participation.</p>
                  </div>
                  <div className="feat-box">
                      <PhoneCall size={32} color="var(--secondary)" />
                      <h3>Our Mission</h3>
                      <p>Ensuring 24/7 responsiveness and modern legal assistance to every citizen.</p>
                  </div>
              </div>
          </div>
        </div>
      </section>

      <ServicesGrid />

      {/* Cyber Section */}
      <section id="cyber" className="section-padding cyber-section">
        <div className="container">
            <div className="glass-card cyber-card">
                <div className="section-header">
                    <h2 className="text-danger"><ShieldAlert size={32} /> Report <span>Cyber Crime</span></h2>
                    <p>Internet fraud, harassment, and data theft are serious crimes. Report them immediately.</p>
                </div>
                <div className="cyber-actions">
                    <p>Facing online threats? Contact the dedicated cell at <strong>1930</strong> or use the national portal.</p>
                    <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="btn-primary">Go to National Portal</a>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Home;
