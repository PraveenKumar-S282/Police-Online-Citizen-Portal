import React, { useState, useEffect } from 'react';
import { UserSearch, Camera, Search, MapPin, Eye, Filter, ShieldCheck } from 'lucide-react';
import './MissingPersons.css';

const MissingPersons = () => {
    const [personsList, setPersonsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [successId, setSuccessId] = useState('');
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');

    const [formInput, setFormInput] = useState({
        name: '',
        age: '',
        gender: '',
        area: '',
        description: ''
    });

    const fetchPersons = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/missing-persons');
            const data = await res.json();
            if (data.success) {
                setPersonsList(data.persons);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const handleInput = (e) => {
        setError('');
        setFormInput({...formInput, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e) => {
        setError('');
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const fileInput = document.getElementById('photo');
        if (!fileInput || !fileInput.files[0]) {
            setError('Please upload a photograph of the person.');
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', formInput.name);
            formData.append('age', formInput.age);
            formData.append('gender', formInput.gender);
            formData.append('area', formInput.area);
            formData.append('date', new Date().toISOString().split('T')[0]);
            formData.append('description', formInput.description);
            formData.append('photo', fileInput.files[0]);

            const res = await fetch('http://localhost:5000/api/missing-persons', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setSuccessId(data.tracking_id);
                fetchPersons();
            } else {
                setError(data.message || 'Submission failed. Please check your data.');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setError('Server connection error. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    if (successId) {
        return (
            <div className="container mp-page">
                <div className="glass-card success-card animate-fade-in">
                    <ShieldCheck size={60} color="var(--success)" />
                    <h2>Report Logged Successfully</h2>
                    <div className="mp-badge">
                        <span>TRACKING ID:</span>
                        <strong>{successId}</strong>
                    </div>
                    <p>Thank you for reporting. Our special cell will review the details and initiate a search operation. You can track updates using the ID above.</p>
                    <button className="btn-primary" onClick={() => { setSuccessId(''); setShowForm(false); }}>View Updated List</button>
                    <button className="btn-outline" onClick={() => window.location.reload()}>Report Another</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mp-page">
            <div className="status-header">
                <h1>Help us Find <span>Missing Persons</span></h1>
                <p>Browse through reported missing persons. If you have any information, please contact your nearest police station or dial 100.</p>
            </div>

            {showForm ? (
                <div className="glass-card report-form-card animate-fade-in">
                    <div className="c-header">
                        <h2>Report a Missing Person</h2>
                        <p>Provide accurate details to help law enforcement in the search.</p>
                    </div>

                    {error && (
                        <div className="error-message glass" style={{ marginBottom: '1.5rem', color: '#fca5a5' }}>
                            <Filter size={16} /> <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleReportSubmit} className="mp-form">
                        <div className="form-row">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input type="text" name="name" placeholder="Entry name" required onChange={handleInput} />
                            </div>
                            <div className="input-group">
                                <label>Age</label>
                                <input type="number" name="age" placeholder="Approx age" required onChange={handleInput} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>Gender</label>
                                <select name="gender" required onChange={handleInput}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Last Seen Area</label>
                                <input type="text" name="area" placeholder="Location name" required onChange={handleInput} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Physical Description (Height, Clothes, etc.)</label>
                            <textarea name="description" rows="3" placeholder="Identify marks, what they were wearing..." required onChange={handleInput}></textarea>
                        </div>
                        <div className="input-group">
                            <label>Citizen's Photograph (Official Use)</label>
                            <div className="file-box-lite glass">
                                <input 
                                    type="file" 
                                    id="photo" 
                                    accept="image/*"
                                    required 
                                    onChange={handleFileChange} 
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="photo" className="v-btn-lite">
                                    <Camera size={20} />
                                    <span>{fileName ? fileName : 'Upload Current Photograph'}</span>
                                </label>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="btn-primary" disabled={submitting}>
                                {submitting ? 'Lodging Report...' : 'Log Search Request'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="mp-controls">
                        <div className="search-bar-container glass">
                            <Search size={22} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by Name or Location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="btn-outline" onClick={() => setShowForm(true)}>+ Report Missing</button>
                    </div>

                    <div className="mp-grid">
                        {Array.isArray(personsList) && personsList.filter(p => (p.name || '').toLowerCase().includes(searchTerm.toLowerCase())).map(person => (
                            <div key={person.id} className="person-card glass-card animate-fade-in">
                                <div className="person-img">
                                    <img src={person.image_url || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400'} alt={person.name} />
                                    <div className="person-overlay">
                                        <button className="btn-view-profile"><Eye size={18} /> View Details</button>
                                    </div>
                                </div>
                                <div className="person-info">
                                    <h3>{person.name || 'Unknown'}</h3>
                                    <div className="p-meta">
                                        <span>{person.age || '??'} Yrs</span> • <span>{person.gender}</span>
                                    </div>
                                    <div className="p-location">
                                        <MapPin size={16} color="var(--secondary)" />
                                        <span>Last seen: {person.area}</span>
                                    </div>
                                    <div className="p-date">
                                        <strong>MISSING SINCE:</strong> {person.lastSeen ? new Date(person.lastSeen).toLocaleDateString() : 'Unknown'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="report-missing-btn">
                <div className="glass-card em-card-mini">
                    <Camera size={28} color="var(--secondary)" />
                    <div>
                        <h3>Found someone?</h3>
                        <p>If you see a missing person, take a photo and report immediately to the nearest officer.</p>
                    </div>
                    <button className="btn-primary">Report a Citizen</button>
                </div>
            </div>
        </div>
    );
};

export default MissingPersons;
