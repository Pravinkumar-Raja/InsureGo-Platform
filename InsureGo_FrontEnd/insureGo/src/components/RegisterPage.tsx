// src/components/RegisterPage.tsx

import React from 'react';
import RegistrationContainer from './Auth/RegistrationContainer';
// import HospitalBackground from '../assets/hospital_background.jpg'; // <-- UNCOMMENT & USE YOUR IMAGE

const RegisterPage: React.FC = () => {
    return (
        <div style={backgroundContainerStyle}>
            <div style={logoHeaderStyle}>
                {/* 💙 Heartbeat Icon */}
                <span style={{ fontSize: '24px', marginRight: '10px', color: '#007bff' }}>{/* Paste your SVG/Icon here or use emoji */} 💙</span>
                <span style={logoTextStyle}>InsureGo Health</span>
            </div>
            <div style={formCardStyle}>
                <h1 style={{ textAlign: 'center', color: '#1e3c72' }}>Create Your Account</h1>
                <RegistrationContainer />
            </div>
        </div>
    );
};

// =========================================================
// STYLING (Shared with Login)
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
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

const formCardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '550px',
    padding: '40px',
    marginTop: '80px', // Push down from the fixed header
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    zIndex: 10
};

export default RegisterPage;