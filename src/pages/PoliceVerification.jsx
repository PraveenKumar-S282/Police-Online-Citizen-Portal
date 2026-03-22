import React, { useState } from 'react';
import { UserCheck, FileText, Home, Briefcase, FileSearch, ShieldCheck } from 'lucide-react';
import './PoliceVerification.css';

const PoliceVerification = () => {
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [refId, setRefId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setRefId(`PV-${Math.floor(100000 + Math.random() * 900000)}`);
            setSubmitting(false);
        }, 1500);
    };

    if (refId) {
        return (
            <div className="container pv-page">
                <div className="glass-card success-card animate-fade-in">
                    <ShieldCheck size={60} color="var(--success)" />
                    <h2>Application Received Successfully</h2>
                    <div className="pv-badge">
                        <span>REFERENCE NUMBER:</span>
                        <strong>{refId}</strong>
                    </div>
                    <p>Your application has been forwarded to the concerned police station for verification. You will be notified via SMS to visit for document verification.</p>
                    <button className="btn-primary" onClick={() => window.location.href = '/'}>Back to Home</button>
                    <button className="btn-outline" onClick={() => window.location.href = '/status'}>Check Application Status</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container pv-page">
            <div className="glass-card pv-card animate-fade-in">
                <div className="c-header">
                    <h2><UserCheck size={32} color="var(--secondary)" /> Police Verification</h2>
                    <p>Apply for background checks for passport, employment, or tenant verification through our official portal.</p>
                </div>

                <div className="pv-steps">
                    <div className={`pv-step ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                        <FileText size={20} /> Selection
                    </div>
                    <div className={`pv-step ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>
                        <Home size={20} /> Details
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="pv-form">
                    {step === 1 ? (
                        <div className="pv-type-grid">
                            <div className="type-box glass" onClick={() => setStep(2)}>
                                <Briefcase size={32} />
                                <h3>Employment</h3>
                                <p>For government or private sector job verification.</p>
                            </div>
                            <div className="type-box glass" onClick={() => setStep(2)}>
                                <FileSearch size={32} />
                                <h3>Passport</h3>
                                <p>Pre-verification for new passport applications.</p>
                            </div>
                            <div className="type-box glass" onClick={() => setStep(2)}>
                                <Home size={32} />
                                <h3>Tenant</h3>
                                <p>Verification for tenants or domestic help.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Present Organization</label>
                                    <input type="text" placeholder="Organization name" required />
                                </div>
                                <div className="input-group">
                                    <label>Purpose of Verification</label>
                                    <input type="text" placeholder="e.g. New Joiner" required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Address of Residence (last 2 years)</label>
                                <textarea rows="3" placeholder="Full residential address" required></textarea>
                            </div>
                            <div className="input-group">
                                <label>Proof of Identity (PDF/JPG)</label>
                                <input type="file" required />
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-outline" onClick={() => setStep(1)}>Back</button>
                                <button type="submit" className="btn-primary" disabled={submitting}>
                                    {submitting ? 'Submitting Application...' : 'Apply for Verification'}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PoliceVerification;
