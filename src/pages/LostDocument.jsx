import React, { useState } from 'react';
import { FileSignature, AlertCircle, Phone, CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import './LostDocument.css';

const LostDocument = () => {
    const [formData, setFormData] = useState({
        documentType: '',
        documentNumber: '',
        lostDate: '',
        lostLocation: '',
        details: ''
    });
    const [reportId, setReportId] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate backend call
        setTimeout(() => {
            const id = `LDR-${Math.floor(100000 + Math.random() * 900000)}`;
            setReportId(id);
            setSubmitting(false);
        }, 1500);
    };

    if (reportId) {
        return (
            <div className="container ldr-page">
                <div className="glass-card success-card animate-fade-in">
                    <CheckCircle size={60} color="var(--success)" />
                    <h2>Report Generated Successfully</h2>
                    <div className="report-id">
                        <span>LDR NUMBER:</span>
                        <strong>{reportId}</strong>
                    </div>
                    <p>This is a digitally signed report valid for applying for duplicate documents. You can download the official PDF from the status page.</p>
                    <button className="btn-primary" onClick={() => window.location.href = '/'}>Back to Portal</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container ldr-page">
            <div className="glass-card ldr-card animate-fade-in">
                <div className="c-header">
                    <h2><FileSignature size={28} color="var(--secondary)" /> Lost Document Report (LDR)</h2>
                    <p>Register reports for lost mobile, certificates, or IDs to get an LDR copy required for duplicates.</p>
                </div>

                <form onSubmit={handleSubmit} className="ldr-form">
                    <div className="form-row">
                        <div className="input-group">
                            <label>Document Type</label>
                            <select 
                                name="documentType" 
                                required 
                                onChange={(e) => setFormData({...formData, documentType: e.target.value})}
                            >
                                <option value="">Select Category</option>
                                <option value="Mobile">Mobile Phone</option>
                                <option value="IMEMark">Identity Card / Passport</option>
                                <option value="Academic">Academic Certificate</option>
                                <option value="DL">Driving License / RC</option>
                                <option value="Other">Other Document</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Document/ID Number</label>
                            <input 
                                type="text" 
                                placeholder="Enter ID or IMEI number" 
                                required
                                onChange={(e) => setFormData({...formData, documentNumber: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Date of Loss</label>
                            <input type="date" required onChange={(e) => setFormData({...formData, lostDate: e.target.value})} />
                        </div>
                        <div className="input-group">
                            <label>Place where Lost</label>
                            <input type="text" placeholder="Approximate location" required onChange={(e) => setFormData({...formData, lostLocation: e.target.value})} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Brief Description</label>
                        <textarea 
                            rows="4" 
                            placeholder="Describe how and where the document was lost..."
                            onChange={(e) => setFormData({...formData, details: e.target.value})}
                        ></textarea>
                    </div>

                    <div className="ldr-notice glass">
                        <AlertCircle size={18} />
                        <p>LDR is not an FIR. It is a report for lost articles where no crime is suspected.</p>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={submitting}>
                            {submitting ? 'Generating Report...' : 'Register Loss & Get LDR'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LostDocument;
