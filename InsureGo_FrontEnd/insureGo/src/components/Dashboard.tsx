// src/components/Dashboard.tsx (The Role Router)

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PatientDashboard from './PatientDashboard'; 
// import DoctorDashboard from './DoctorDashboard'; // Future component

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState<string | null>(null);
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode<{ role: string }>(token);
            setUserRole(decoded.role);
        } catch (error) {
            console.error('Invalid token, logging out:', error);
            localStorage.removeItem('jwtToken');
            navigate('/login');
        }
    }, [token, navigate]);

    if (!userRole) {
        return <p style={{ textAlign: 'center', marginTop: '50px' }}>Authenticating...</p>;
    }

    // --- Role-based rendering ---
    switch (userRole) {
        case 'Patient':
            return <PatientDashboard />;
        case 'Doctor':
            // return <DoctorDashboard />; // Future implementation
        case 'InsuranceProvider':
            // return <InsuranceDashboard />; // Future implementation
        default:
            return (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>Welcome, {userRole}</h2>
                    <p>Your specific dashboard is not yet implemented.</p>
                </div>
            );
    }
};

export default Dashboard;