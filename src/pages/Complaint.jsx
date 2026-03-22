import React, { useState } from 'react';
import { FileText, MapPin, Calendar, Clock, Image as ImageIcon, AlertCircle } from 'lucide-react';
import './Complaint.css';

const Complaint = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    incidentDate: '',
    incidentTime: '',
    location: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firNumber, setFirNumber] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        setFirNumber(data.fir_number);
      } else {
        setError(data.message || 'Failed to file complaint.');
      }
    } catch (err) {
      setError('Connection error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (firNumber) {
    return (
      <div className="container complaint-page">
        <div className="glass-card success-card animate-fade-in" style={{ borderColor: 'var(--success)' }}>
          <div className="success-icon">
            <FileText size={60} color="var(--success)" />
          </div>
          <h2>Complaint Filed Successfully!</h2>
          <div className="fir-badge">
             <span>YOUR FIR NUMBER:</span>
             <strong>{firNumber}</strong>
          </div>
          <p>Please note down this FIR number to track your case status. A receipt has also been generated for your reference.</p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => window.location.reload()}>File New Complaint</button>
            <button className="btn-outline" onClick={() => window.location.href = '/'}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container complaint-page">
      <div className="glass-card complaint-card animate-fade-in">
        <div className="c-header">
          <h2>Register completely New Complaint</h2>
          <p>Please enter the details regarding the incident accurately. False reporting is a punishable offense under the law (Section 182 & 211 of IPC).</p>
        </div>

        {error && (
          <div className="error-message glass" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={16} /> <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="complaint-form">
          <div className="form-row">
            <div className="input-group">
              <label>Complaint Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Brief title of incident" required />
            </div>
            
            <div className="input-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="theft">Theft / Robbery</option>
                <option value="cyber">Cyber Crime</option>
                <option value="assault">Assault / Violence</option>
                <option value="harassment">Harassment</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label><Calendar size={16} /> Date of Incident</label>
              <input type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} required />
            </div>
            
            <div className="input-group">
              <label><Clock size={16} /> Time of Incident</label>
              <input type="time" name="incidentTime" value={formData.incidentTime} onChange={handleChange} required />
            </div>
          </div>

          <div className="input-group">
            <label><MapPin size={16} /> Exact Location of Incident</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Street address, landmark, or city" required />
          </div>

          <div className="input-group">
            <label>Detailed Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Describe what happened in detail..." required></textarea>
          </div>

          <div className="input-group file-upload">
            <label><ImageIcon size={16} /> Attach Evidence (Images/Videos/Docs)</label>
            <input type="file" multiple accept="image/*,video/*,.pdf" />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Submit Complaint</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
