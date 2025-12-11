// components/InsuranceDashboard.tsx
import React from 'react';

// ⚠️ NEW: Define the props interface
interface DashboardProps {
    onLogout: () => void;
}

// ⚠️ NEW: Accept onLogout prop
const InsuranceDashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="flex justify-between items-center mb-8"> {/* ⚠️ MODIFIED HEADER */}
                <h1 className="text-3xl font-bold text-red-700">🏦 Insurance Provider Dashboard</h1>
                {/* ✅ LOGOUT BUTTON */}
                <button 
                    onClick={onLogout} 
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium"
                >
                    Log Out
                </button>
            </header>
            <p className="text-lg text-gray-700 mb-8">
                Welcome. Manage claims, policies, and ensure fraud reduction.
            </p>

            {/* ... rest of the card content (Review Claims, Policies, Fraud) ... */}
        </div>
    );
};

export default InsuranceDashboard;