import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, ShieldCheck, Calendar, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('http://localhost:5000/api/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setProfile(data.user);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="loader">Personalizing your profile...</div>;
    if (!profile) return <div className="error">Failed to load profile. Please relogin.</div>;

    return (
        <div className="container profile-page">
            <div className="glass-card profile-card animate-fade-in">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <User size={60} color="var(--secondary)" />
                    </div>
                    <div className="profile-title">
                        <h1>{profile.fullName}</h1>
                        <p className="badge">Citizen Member since {new Date(profile.created_at).getFullYear()}</p>
                    </div>
                </div>

                <div className="profile-details">
                    <div className="detail-item glass">
                        <Mail size={20} />
                        <div>
                            <label>Email Address</label>
                            <span>{profile.email}</span>
                        </div>
                    </div>
                    <div className="detail-item glass">
                        <Phone size={20} />
                        <div>
                            <label>Phone Number</label>
                            <span>+91 {profile.phone}</span>
                        </div>
                    </div>
                    <div className="detail-item glass">
                        <ShieldCheck size={20} />
                        <div>
                            <label>Aadhar ID Number</label>
                            <span>XXXX-XXXX-{profile.aadharNumber.slice(-4)}</span>
                        </div>
                    </div>
                    <div className="detail-item glass">
                        <Calendar size={20} />
                        <div>
                            <label>Member Since</label>
                            <span>{new Date(profile.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-actions">
                    <Link to="/status" className="profile-btn glass">
                        <div>
                            <FileText size={20} />
                            <span>My Registered FIRs</span>
                        </div>
                        <ArrowRight size={18} />
                    </Link>
                    <Link to="/complaint" className="profile-btn glass highlight">
                        <div>
                            <FileText size={20} />
                            <span>File New Complaint</span>
                        </div>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
