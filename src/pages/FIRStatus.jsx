import React, { useState, useEffect } from 'react';
import { Search, Loader2, FileCheck, Clock, MapPin, Eye } from 'lucide-react';
import './FIRStatus.css';

const FIRStatus = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/complaints', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setComplaints(data.complaints);
      }
    } catch (err) {
      console.error('Error fetching complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter(c => 
    c.fir_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'status-pending';
      case 'Under Investigation': return 'status-investigation';
      case 'Resolved': return 'status-resolved';
      case 'Closed': return 'status-closed';
      default: return '';
    }
  };

  return (
    <div className="container status-page">
      <div className="status-header">
        <h1>Track <span>FIR Status</span></h1>
        <p>Search and monitor the real-time progress of your registered complaints.</p>
      </div>

      <div className="search-bar-container glass">
        <Search size={20} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search by FIR Number or Subject..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader2 className="spinner" size={40} />
          <p>Fetching records from records...</p>
        </div>
      ) : (
        <div className="complaints-list">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map(complaint => (
              <div key={complaint.id} className="complaint-item glass-card animate-fade-in">
                <div className="item-main">
                  <div className="item-info">
                    <span className="fir-tag">{complaint.fir_number}</span>
                    <h3>{complaint.subject}</h3>
                    <div className="meta-info">
                      <span><Clock size={14} /> {new Date(complaint.incidentDate).toLocaleDateString()}</span>
                      <span><MapPin size={14} /> {complaint.location}</span>
                    </div>
                  </div>
                  <div className={`status-badge ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </div>
                </div>
                <div className="item-actions">
                   <p className="category-text">Category: <span>{complaint.category}</span></p>
                   <button className="btn-view"><Eye size={16} /> View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-records glass-card">
              <FileCheck size={48} color="var(--text-muted)" />
              <p>No FIR records found. Please file a complaint to see status.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FIRStatus;
