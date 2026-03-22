import React, { useState } from 'react';
import { Car, Search, ShieldAlert, CheckCircle, Database } from 'lucide-react';
import './VehicleEnquiry.css';

const VehicleEnquiry = () => {
    const [regNumber, setRegNumber] = useState('');
    const [result, setResult] = useState(null);
    const [searching, setSearching] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearching(true);
        setResult(null);
        
        // Simulate real-time database search
        setTimeout(() => {
            const found = Math.random() > 0.5 ? {
                status: 'STOLEN',
                model: 'HONDA CIVIC 2021',
                owner: 'Anjali Sharma',
                lastSeen: '22-Mar-2026',
                fir: 'FIR-2025-9214'
            } : {
                status: 'CLEAN',
                message: 'No stolen records found in national database for this registration number.'
            };
            setResult(found);
            setSearching(false);
        }, 1500);
    };

    return (
        <div className="container vehicle-page">
            <div className="glass-card vehicle-card animate-fade-in">
                <div className="c-header">
                    <h2><Car size={32} color="var(--secondary)" /> Vehicle Enquiry System</h2>
                    <p>Enter the vehicle registration number to search for stolen or recovered vehicle records in the state and national database.</p>
                </div>

                <form onSubmit={handleSearch} className="search-box glass">
                    <Search size={22} color="var(--text-muted)" />
                    <input 
                        type="text" 
                        placeholder="Enter Vehicle Number (e.g., TN01AB1234)" 
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        required
                        className="v-input"
                    />
                    <button type="submit" className="btn-primary" disabled={searching}>
                        {searching ? 'Querying...' : 'Search records'}
                    </button>
                </form>

                {result && (
                    <div className={`result-box glass-card animate-fade-in ${result.status === 'STOLEN' ? 'stolen-alert' : 'clean-alert'}`}>
                        <div className="result-header">
                            {result.status === 'STOLEN' ? <ShieldAlert size={40} /> : <CheckCircle size={40} />}
                            <div>
                                <h3>Status: {result.status}</h3>
                                <p>{result.message || 'Verification complete.'}</p>
                            </div>
                        </div>

                        {result.status === 'STOLEN' && (
                            <div className="stolen-details">
                                <div className="s-row"><span>MODEL:</span> <strong>{result.model}</strong></div>
                                <div className="s-row"><span>OWNER:</span> <strong>{result.owner}</strong></div>
                                <div className="s-row"><span>LAST SEEN:</span> <strong>{result.lastSeen}</strong></div>
                                <div className="s-row"><span>FIR REF:</span> <strong>{result.fir}</strong></div>
                            </div>
                        )}
                        
                        <div className="db-badge">
                            <Database size={14} /> Official Police Database Verified
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleEnquiry;
