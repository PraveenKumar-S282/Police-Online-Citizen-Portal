import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, ShieldAlert, MonitorCheck, Car, 
  UserSearch, Download, Users, FileSignature 
} from 'lucide-react';
import './ServicesGrid.css';

const services = [
  { id: 1, title: 'Register Online Complaint', icon: <FileText size={32} />, desc: 'Lodge a formal complaint online without visiting the station.', path: '/complaint' },
  { id: 2, title: 'View FIR Status', icon: <MonitorCheck size={32} />, desc: 'Check the real-time status of your registered FIR.', path: '/status' },
  { id: 3, title: 'CSR Status', icon: <ShieldAlert size={32} />, desc: 'Track Community Service Register updates instantly.', path: '/status' },
  { id: 4, title: 'Vehicle Enquiry', icon: <Car size={32} />, desc: 'Search for stolen or recovered vehicles across the state.', path: '/vehicle-enquiry' },
  { id: 5, title: 'Missing Persons', icon: <UserSearch size={32} />, desc: 'Report or search for missing persons via our database.', path: '/missing-persons' },
  { id: 6, title: 'Download FIR / CSR', icon: <Download size={32} />, desc: 'Get official copies of your FIR or CSR digitally.', path: '/status' },
  { id: 7, title: 'Police Verification', icon: <Users size={32} />, desc: 'Apply for background checks for passport/employment.', path: '/verification' },
  { id: 8, title: 'Lost Document Report', icon: <FileSignature size={32} />, desc: 'Report lost mobile, IDs to get an LDR copy.', path: '/lost-report' },
];

const ServicesGrid = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Citizen <span>Services</span></h2>
          <p className="section-subtitle">Quick and transparent access to essential police services from the comfort of your home.</p>
        </div>

        <div className="services-grid">
          {services.map((svc, idx) => (
            <div 
              key={svc.id} 
              className={`service-card glass-card animate-fade-in delay-${(idx % 4) + 1}`}
            >
              <div className="s-icon-wrapper">
                {svc.icon}
              </div>
              <h3 className="s-title">{svc.title}</h3>
              <p className="s-desc">{svc.desc}</p>
              <Link to={svc.path} className="s-link" aria-label={`Proceed to ${svc.title}`}>
                Access Service &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
