import React from 'react';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer-section">
      <div className="container footer-content">
        <div className="f-col company-info">
          <div className="f-logo">
            <Shield size={28} color="#FACC15" />
            <h3>STATE POLICE</h3>
          </div>
          <p className="f-desc">
            Serving with pride, protecting with honor. A centralized platform dedicated to citizen welfare, reducing crime, and easy access to law enforcement services.
          </p>
          <div className="f-socials">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>

        <div className="f-col">
          <h4 className="f-title">Quick Links</h4>
          <ul className="f-links">
            <li><a href="#">Report Cyber Crime</a></li>
            <li><a href="#">Road Safety Rules</a></li>
            <li><a href="#">Missing Persons</a></li>
            <li><a href="#">Unidentified Dead Bodies</a></li>
            <li><a href="#">Towed Vehicles</a></li>
          </ul>
        </div>

        <div className="f-col">
          <h4 className="f-title">Important Portals</h4>
          <ul className="f-links">
            <li><a href="#">National Cyber Crime Portal</a></li>
            <li><a href="#">CCTNS Citizen Portal</a></li>
            <li><a href="#">Vahan E-Challan</a></li>
            <li><a href="#">Ministry of Home Affairs</a></li>
            <li><a href="#">Women Safety Portal</a></li>
          </ul>
        </div>

        <div className="f-col address-col">
          <h4 className="f-title">Headquarters</h4>
          <ul className="f-contact">
            <li>
              <MapPin size={18} color="#facc15" />
              <span>Office of the Director General of Police, State Police Headquarters.</span>
            </li>
            <li>
              <Phone size={18} color="#facc15" />
              <span>+91-11-23456789 (General)</span>
            </li>
            <li>
              <Mail size={18} color="#facc15" />
              <span>contact@statepolice.gov.in</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container fb-content">
          <p>&copy; {new Date().getFullYear()} State Police Department. All rights reserved.</p>
          <p>Designed and Built securely for Citizens.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
