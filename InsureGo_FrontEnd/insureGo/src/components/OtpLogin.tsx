// import React, { useState, useCallback } from 'react';

// // Recommended third-party library for professional phone number input/validation
// // import 'react-phone-input-2/lib/style.css' 
// // import PhoneInput from 'react-phone-input-2'; 

// const API_BASE_URL = 'http://localhost:8080/api/auth'; 

// function OtpLogin({ onLoginSuccess }) {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otpCode, setOtpCode] = useState('');
//   const [step, setStep] = useState('phone'); // 'phone' or 'otp'
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [countdown, setCountdown] = useState(0); // Timer state (optional)

//   // Function to start the countdown timer (for UX)
//   const startCountdown = () => {
//     setCountdown(60); // 60 seconds
//     const interval = setInterval(() => {
//       setCountdown(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };


//   // --- Step 1: Request OTP ---
//   const handleRequestOtp = useCallback(async (e) => {
//     e.preventDefault();
//     if (!phoneNumber) return; 

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${API_BASE_URL}/request-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phoneNumber }),
//       });

//       if (!response.ok) {
//         const errData = await response.json();
//         throw new Error(errData.message || 'Failed to send OTP. Check the phone number.');
//       }

//       setStep('otp'); 
//       startCountdown();
      
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [phoneNumber]);


//   // --- Step 2: Verify OTP ---
//   const handleVerifyOtp = useCallback(async (e) => {
//     e.preventDefault();
//     if (otpCode.length !== 6) { // Enforce OTP length
//         setError('Please enter the full 6-digit code.');
//         return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${API_BASE_URL}/verify-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phoneNumber, otpCode }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Verification failed. Invalid or expired code.');
//       }

//       // SUCCESS: Store the JWT and navigate
//       localStorage.setItem('userToken', data.token);
//       onLoginSuccess(data.token); // Parent function to handle redirection to dashboard

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [phoneNumber, otpCode, onLoginSuccess]);


//   // --- Render Logic ---
//   return (
//     <div className="otp-login-container">
//       <h3>Login with Phone Code</h3>
      
//       {error && <div style={{color: 'red', border: '1px solid red', padding: '10px'}}>{error}</div>}

//       {step === 'phone' ? (
//         <form onSubmit={handleRequestOtp}>
//           <input
//             type="tel"
//             placeholder="Enter Phone Number (e.g., +15551234567)"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             disabled={loading}
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? 'Sending...' : 'Send OTP Code'}
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp}>
//           <p>Code sent to: **{phoneNumber}** <a href="#" onClick={() => { setStep('phone'); setError(null); setCountdown(0); }}>(Change)</a></p>
          
//           <input
//             type="text"
//             placeholder="Enter 6-digit Code"
//             maxLength={6}
//             value={otpCode}
//             onChange={(e) => setOtpCode(e.target.value)}
//             disabled={loading}
//           />
          
//           <p>Time remaining: {countdown} seconds</p>
//           <button 
//             type="button" 
//             onClick={handleRequestOtp} 
//             disabled={loading || countdown > 0}>
//             Resend Code
//           </button>

//           <button type="submit" disabled={loading || otpCode.length !== 6}>
//             {loading ? 'Verifying...' : 'Verify & Login'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default OtpLogin;