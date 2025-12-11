// src/components/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../utils/api'; 
// import HospitalBackground from '../assets/hospital_background.jpg'; // <-- UNCOMMENT & USE YOUR IMAGE

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        try {
            const result = await postApi('/login', { email, password });
            
            if (result.token && result.role) {
                localStorage.setItem('jwtToken', result.token);
                navigate('/dashboard'); 
            } else {
                setError('Login failed: Invalid server response.');
            }
        } catch (err) {
            setError(`Login Error: ${err instanceof Error ? err.message : 'Authentication failed.'}`);
        }
    };

    return (
        <div style={backgroundContainerStyle}>
            <div style={logoHeaderStyle}>
                {/* 💙 Heartbeat Icon */}
                <span style={{ fontSize: '24px', marginRight: '10px', color: '#007bff' }}>{/* Paste your SVG/Icon here or use emoji */} 💙</span>
                <span style={logoTextStyle}>InsureGo Health</span>
            </div>

            <div style={formContainerStyle}>
                <h2>User Login</h2>
                
                <form onSubmit={handleLogin} style={formStyle}>
                    <label style={labelStyle}>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
                    
                    <label style={labelStyle}>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
                    
                    <button type="submit" style={submitButtonStyle}>Log In</button>
                </form>
                
                {error && <p style={errorStyle}>{error}</p>}
                
                <p style={footerTextStyle}>
                    Don't have an account? <a href="/register" style={linkStyle}>Register here</a>
                </p>
            </div>
        </div>
    );
};

// =========================================================
// STYLING
// =========================================================

const backgroundContainerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // --- HOSPITAL BACKGROUND EFFECT ---
    backgroundImage: `url(YOUR_LOCAL_IMAGE_PATH)`, // REPLACE THIS
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '20px',
};

const logoHeaderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
    padding: '15px 0',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent header
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const logoTextStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1e3c72'
};

const formContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '450px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white card
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    zIndex: 10
};

const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
};

const labelStyle: React.CSSProperties = {
    fontWeight: '600',
    color: '#333',
    marginBottom: '5px'
};

const inputStyle: React.CSSProperties = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px'
};

const submitButtonStyle: React.CSSProperties = {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px'
};

const errorStyle: React.CSSProperties = {
    color: '#dc3545',
    marginTop: '15px',
    textAlign: 'center'
};

const footerTextStyle: React.CSSProperties = {
    marginTop: '20px',
    textAlign: 'center',
    color: '#555'
};

const linkStyle: React.CSSProperties = {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold'
};

export default LoginPage;