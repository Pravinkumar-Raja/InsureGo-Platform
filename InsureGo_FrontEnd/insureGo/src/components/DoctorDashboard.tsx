// components/DoctorDashboard.tsx
import React, { useState } from 'react';

// ⚠️ NEW: Define the props interface
interface DashboardProps {
    onLogout: () => void;
}

// ⚠️ NEW: Accept onLogout prop
const DoctorDashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    // State for the claim submission form...
    const [isFormVisible, setIsFormVisible] = useState(false);
    // ... other states ...
    
    // ... handleClaimSubmit function (remains the same) ...
    // ... (rest of form state and logic) ...

    if (isFormVisible) {
        // Renders the full claim submission form
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <button 
                    onClick={() => setIsFormVisible(false)}
                    className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition text-sm font-medium"
                >
                    &larr; Back to Dashboard
                </button>
                {/* ... form content ... */}
            </div>
        );
    }
    
    // Renders the main dashboard cards view (default)
    return (
        <div className="min-h-screen bg-gray-50 p-8">
             <header className="flex justify-between items-center mb-8"> {/* ⚠️ MODIFIED HEADER */}
                <h1 className="text-3xl font-bold text-green-700">👩‍⚕️ Doctor's Dashboard</h1>
                {/* ✅ LOGOUT BUTTON */}
                <button 
                    onClick={onLogout} 
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium"
                >
                    Log Out
                </button>
            </header>
            <p className="text-lg text-gray-700 mb-8">
                Welcome, Doctor. Your focus is digital visit notes and claim submission.
            </p>

            {/* ... rest of the card content (Submit Claim, Eligibility, Tracker) ... */}
        </div>
    );
};

export default DoctorDashboard;