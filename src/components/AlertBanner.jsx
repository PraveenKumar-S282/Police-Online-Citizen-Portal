import React from 'react';
import { AlertTriangle, BellRing } from 'lucide-react';
import './AlertBanner.css';

const AlertBanner = () => {
  return (
    <div className="alert-banner">
      <div className="container banner-content">
        <div className="banner-label">
          <BellRing size={16} className="pulse-icon" />
          <span>ALERTS</span>
        </div>
        <div className="scrolling-text-container">
          <div className="scrolling-text">
            <span><AlertTriangle size={14} color="#facc15" /> Beware of fake calls asking for OTP/Bank details. State Police never asks for your personal banking information.</span>
            <span><AlertTriangle size={14} color="#facc15" /> Report cyber crimes immediately at 1930 or visit cybercrime.gov.in</span>
            <span><AlertTriangle size={14} color="#facc15" /> Traffic violations will now be monitored via CCTV. Follow road safety rules.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
