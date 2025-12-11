// src/components/Auth/RegistrationContainer.tsx

import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInputForm from './OtpInputForm'; 
import { postApi } from '../../utils/api'; 

// =========================================================
// 1. TYPE DEFINITIONS
// =========================================================

interface IFormData {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: 'Patient' | 'Doctor' | 'InsuranceProvider';
}

interface IVerificationStatus {
    phone: boolean;
    email: boolean;
}

interface IOtpSent {
    phone: boolean;
    email: boolean;
}

const initialFormData: IFormData = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'Patient', 
};

type StepType = 'details' | 'success'; 
type IdentifierType = 'phone' | 'email';

const RegistrationContainer: React.FC = () => {
    const navigate = useNavigate(); 
    
    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const [step, setStep] = useState<StepType>('details');
    const [verificationStatus, setVerificationStatus] = useState<IVerificationStatus>({ phone: false, email: false });
    const [otpSent, setOtpSent] = useState<IOtpSent>({ phone: false, email: false });
    
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    
    // Handles all input and select changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value as IFormData[keyof IFormData] }); 
    };
    
    // --- UTILITY: Checks if all account fields are filled ---
    const areDetailsComplete = (): boolean => {
        return !!formData.name && !!formData.email && !!formData.phoneNumber && !!formData.password;
    };

    // =========================================================
    // 2. HANDLERS
    // =========================================================

    const handleRequestOtp = async (identifierType: IdentifierType) => {
        setError(null);
        setMessage('');
        
        // --- FIX: ENFORCE ALL FIELDS ARE FILLED BEFORE REQUESTING OTP ---
        if (!areDetailsComplete()) {
            setError("Please fill out all account details (Name, Email, Phone, Password) before requesting verification codes.");
            return;
        }
        
        const identifier = identifierType === 'phone' ? formData.phoneNumber : formData.email;
        
        try {
            const endpoint = identifierType === 'phone' ? '/register/request-phone-otp' : '/register/request-email-otp';
            const body = identifierType === 'phone' ? { phoneNumber: identifier } : { email: identifier };

            const result = await postApi(endpoint, body); 
            
            setOtpSent(prev => ({ ...prev, [identifierType]: true }));
            setMessage(result.message || `${identifierType} code sent! Check your inbox/SMS/Spam.`);
        } catch (err) {
            setError(`Failed to send ${identifierType} code: ${err instanceof Error ? err.message : String(err)}`);
        }
    };
    
    const handleVerifyOtp = async (identifierType: IdentifierType, otpCode: string) => {
        setError(null);
        setMessage('');
        
        // --- CRITICAL CHECK: Ensure complete data is sent to the backend ---
        if (!areDetailsComplete()) {
             setError("Missing account details. Please ensure all primary fields are filled.");
             return;
        }

        try {
            const endpoint = identifierType === 'phone' ? '/register/verify-phone-otp' : '/register/verify-email-otp';
            
            // Send ALL THREE fields to satisfy the backend OtpVerificationRequest DTO
            const body = { 
                otpCode,
                phoneNumber: formData.phoneNumber,
                email: formData.email 
            };
            
            const result = await postApi(endpoint, body); 

            setVerificationStatus(prev => {
                const newStatus = { ...prev, [identifierType]: true };
                setMessage(result.message || `${identifierType} verified successfully!`);
                return newStatus;
            });
            
        } catch (err) {
             // The backend sends back "Invalid code." or a detailed error message
             setError(`Verification failed for ${identifierType}. ${err instanceof Error ? err.message : 'Invalid code.'}`);
        }
    };

    const handleFinalRegister = async () => {
        setError(null);
        setMessage('');
        
        // Final client-side check to ensure both flags are true
        if (!verificationStatus.phone || !verificationStatus.email) {
            setError("Error: Both Phone and Email must be verified before final registration.");
            return;
        }

        try {
            // Final API call to save the user to the database
            const result = await postApi('/register', formData);
            
            setMessage(result.message || 'Registration Complete! Redirecting to login...');
            setStep('success');
            
            setTimeout(() => {
                navigate('/login'); 
            }, 2000);
            
        } catch (err) {
            setError(`Final registration failed: ${err instanceof Error ? err.message : String(err)}`);
        }
    };
    
    // =========================================================
    // 3. RENDER LOGIC
    // =========================================================
    
    const renderForm = () => (
        <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            
            <h3>Account Details</h3>
            
            <div style={formGroupStyle}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />

                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required style={inputStyle} />

                <label>Role:</label>
                <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="InsuranceProvider">Insurance Provider</option>
                </select>
            </div>
            
            <hr style={{ margin: '20px 0' }} />

            {/* Email Input and Verification */}
            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Email: {verificationStatus.email && <span style={{color:'green', fontWeight:'bold'}}>(Verified!)</span>}</label>
                <div style={inlineInputGroupStyle}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={verificationStatus.email} required style={inputStyle} />
                    <button type="button" onClick={() => handleRequestOtp('email')} disabled={verificationStatus.email || !areDetailsComplete()} style={buttonStyle}>
                        {verificationStatus.email ? 'Verified' : otpSent.email ? 'Resend OTP' : 'Request OTP'}
                    </button>
                </div>
                {otpSent.email && !verificationStatus.email && (
                    <OtpInputForm identifierType="email" onVerify={(code: string) => handleVerifyOtp('email', code)} />
                )}
            </div>
            
            {/* Phone Input and Verification */}
            <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Phone Number: {verificationStatus.phone && <span style={{color:'green', fontWeight:'bold'}}>(Verified!)</span>}</label>
                <div style={inlineInputGroupStyle}>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} disabled={verificationStatus.phone} required style={inputStyle} />
                    <button type="button" onClick={() => handleRequestOtp('phone')} disabled={verificationStatus.phone || !areDetailsComplete()} style={buttonStyle}>
                        {verificationStatus.phone ? 'Verified' : otpSent.phone ? 'Resend OTP' : 'Request OTP'}
                    </button>
                </div>
                {otpSent.phone && !verificationStatus.phone && (
                    <OtpInputForm identifierType="phone" onVerify={(code: string) => handleVerifyOtp('phone', code)} />
                )}
            </div>
            
            {/* Final Register Button */}
            <button type="button" onClick={handleFinalRegister} disabled={!verificationStatus.phone || !verificationStatus.email} style={submitButtonStyle}>
                Register Account
            </button>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        </form>
    );
    
    // Inline styles for cleaner code
    const formGroupStyle = { display: 'flex', flexDirection: 'column', gap: '10px' } as React.CSSProperties;
    const inputStyle = { padding: '8px', flexGrow: 1 } as React.CSSProperties;
    const labelStyle = { display: 'block', marginBottom: '5px' } as React.CSSProperties;
    const inlineInputGroupStyle = { display: 'flex', gap: '10px' } as React.CSSProperties;
    const buttonStyle = { padding: '8px 15px', whiteSpace: 'nowrap' } as React.CSSProperties;
    const submitButtonStyle = { padding: '10px 20px', width: '100%', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' } as React.CSSProperties;


    return (
        <div>
            {step === 'details' && renderForm()}
            {step === 'success' && 
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3>🎉 Registration Complete!</h3>
                    <p>Redirecting you to the login page...</p>
                </div>
            }
        </div>
    );
};

export default RegistrationContainer;