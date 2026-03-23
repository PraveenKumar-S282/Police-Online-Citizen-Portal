import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    const isMobile = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else if (isMobile) {
      // Automatic Login Bypass for Mobile
      const guestUser = { id: 100, fullName: 'Guest Mobile', email: 'mobile@guest.com', isGuest: true };
      setUser(guestUser);
      localStorage.setItem('currentUser', JSON.stringify(guestUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, email: userData.email.trim().toLowerCase() }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Server connection error.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
