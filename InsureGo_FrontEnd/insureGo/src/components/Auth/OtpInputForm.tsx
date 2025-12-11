// src/components/Auth/OtpInputForm.tsx (Final structural fix)

import React, { useState, ChangeEvent } from 'react';

interface OtpInputFormProps {
    identifierType: 'email' | 'phone';
    onVerify: (code: string) => void; 
}

const OtpInputForm: React.FC<OtpInputFormProps> = ({ identifierType, onVerify }) => {
    const [otpCode, setOtpCode] = useState<string>('');

    // --- NEW: Function triggered by button click, not form submission ---
    const handleVerifyClick = () => {
        if (otpCode.length === 6 && /^\d{6}$/.test(otpCode)) { 
            onVerify(otpCode); // Call the parent handler
        } else {
            // Optional: Provide visual feedback here
            console.error("OTP must be 6 digits.");
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, '').slice(0, 6);
        setOtpCode(numericValue);
    };

    return (
        // --- FIX: NO <form> TAG HERE! ---
        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}> 
            <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={otpCode}
                onChange={handleInputChange} 
                required
                style={{ padding: '8px', flexGrow: 1 }}
            />
            {/* --- FIX: EXPLICITLY type="button" and use the click handler --- */}
            <button 
                type="button" 
                onClick={handleVerifyClick} 
                disabled={otpCode.length !== 6} // Disable unless 6 digits are entered
                style={{ padding: '8px 15px' }}
            >
                Verify Code
            </button>
        </div>
        // --- END FIX ---
    );
};

export default OtpInputForm;