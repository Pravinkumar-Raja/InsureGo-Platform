// src/components/PatientDashboard.tsx (Production-Ready Name Fetch)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// --- Interfaces ---
interface JwtPayload {
    sub: string; // User identifier (email) from the JWT
    role: string;
    exp: number;
}

// --- REAL ASYNCHRONOUS API CALL TO FETCH NAME (Updated to use port 8760) ---
// This function relies on the backend having the /api/auth/user/name endpoint
// implemented to read the JWT's Authorization header and return the user's name.
const fetchUserNameFromBackend = async (): Promise<string> => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        return 'Login Required';
    }
    
    // FIX APPLIED: Using the correct Spring Boot port 8760
    const backendUrl = `http://localhost:8760/api/auth/user/name`; 

    try {
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Pass the JWT in the Authorization header
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch user name. Status:', response.status);
            
            // Check for specific error status codes (e.g., 401 Unauthorized, 404 Not Found)
            if (response.status === 401) {
                return 'Authentication Failed'; 
            }
            if (response.status === 404) {
                 return 'User Not Found'; 
            }
            return 'Profile Error'; 
        }

        const data = await response.json();
        
        // The backend should return a JSON object like { name: "..." }
        return data.name || 'Name Missing';

    } catch (error) {
        // This catch block handles network errors (e.g., server down, firewall)
        console.error('Network error during name fetch:', error);
        return 'Connection Error';
    }
};


// =========================================================
// 1. MODULE COMPONENTS (Interactive Sections) 
// =========================================================

// (Modules remain here, unchanged for brevity but using the styles defined below)

const ModuleMyAppointments: React.FC = () => (
    <div>
        <h2>📅 My Appointments</h2>
        <p>Here you can view, modify, or cancel your scheduled visits.</p>
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th style={thStyle}>Date & Time</th>
                    <th style={thStyle}>Doctor</th>
                    <th style={thStyle}>Reason</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr><td style={tdStyle}>2026-01-20, 10:00 AM</td><td style={tdStyle}>Dr. Smith (PCP)</td><td style={tdStyle}>Annual Checkup</td><td style={tdStyle}><span style={statusConfirmedStyle}>Confirmed</span></td><td style={tdStyle}><button style={{...moduleButtonDangerStyle, padding: '5px 10px'}}>Cancel</button></td></tr>
                <tr><td style={tdStyle}>2026-02-15, 02:30 PM</td><td style={tdStyle}>Dr. Bob Jones</td><td style={tdStyle}>Follow-up</td><td style={tdStyle}><span style={statusPendingStyle}>Requested</span></td><td style={tdStyle}><button style={{...moduleButtonPrimaryStyle, padding: '5px 10px'}}>Modify</button></td></tr>
            </tbody>
        </table>
    </div>
);

const ModuleBookAppointment: React.FC = () => {
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');

    const handleBooking = () => {
        if (!selectedProvider || !selectedDate) {
            alert("Please select a provider and a date.");
            return;
        }
        alert(`Attempting to book with ${selectedProvider} on ${selectedDate}.`);
    };

    return (
        <div>
            <h2>预约 Book Appointment</h2>
            <p>Select a provider and time slot to schedule your next visit.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', marginTop: '20px' }}>
                <label style={labelStyle}>Select Provider:</label>
                <select style={inputStyle} onChange={(e) => setSelectedProvider(e.target.value)} value={selectedProvider}>
                    <option value="">— Select a Doctor —</option>
                    <option value="Dr. Alice Smith (PCP)">Dr. Alice Smith (PCP)</option>
                    <option value="Dr. Bob Jones (Specialist)">Dr. Bob Jones (Specialist)</option>
                </select>
                
                <label style={labelStyle}>Select Date:</label>
                <input type="date" style={inputStyle} onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />

                <button onClick={handleBooking} style={moduleButtonPrimaryStyle}>
                    Check Availability & Book
                </button>
            </div>
        </div>
    );
};

const ModuleUploadCard: React.FC = () => (
    <div>
        <h2>💳 Upload/Manage Insurance Card</h2>
        <p>Enter your policy details manually or upload an image for automatic scanning.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '20px' }}>
            <label style={labelStyle}>Policy Number:</label>
            <input type="text" placeholder="e.g., ABC12345" style={inputStyle} />
            
            <label style={labelStyle}>Provider Name:</label>
            <input type="text" placeholder="e.g., Blue Cross Blue Shield" style={inputStyle} />
            
            <label style={labelStyle}>Card Expiration Date:</label>
            <input type="date" style={inputStyle} />
            
            <button style={moduleButtonSecondaryStyle}>Save Policy Details</button>
            <button style={moduleButtonPrimaryStyle}>Upload Card Image</button>
        </div>
    </div>
);

const ModuleRenewCard: React.FC = () => (
    <div>
        <h2>🔄 Renew Card & Expiry Alerts</h2>
        <p>Your portal tracks your policy validity. Start the guided renewal process below or update your primary address.</p>
        
        <div style={alertWarningStyle}>
            ⚠️ **ALERT:** Your current insurance card expires in 30 days!
        </div>
        
        <button style={moduleButtonPrimaryStyle}>Start Guided Renewal Simulation</button>
        <button style={{...moduleButtonSecondaryStyle, marginLeft: '10px'}}>Update Personal Info</button>
    </div>
);

const ModuleTrackClaims: React.FC = ( ) => (
    <div>
        <h2>📊 Track Claims</h2>
        <p>View the status of all your submitted insurance claims (pending, approved, denied).</p>
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th style={thStyle}>Claim ID</th>
                    <th style={thStyle}>Date Filed</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr><td style={tdStyle}>A12345</td><td style={tdStyle}>2025-11-15</td><td style={tdStyle}><span style={statusApprovedStyle}>Approved</span></td><td style={tdStyle}>$550.00</td></tr>
                <tr><td style={tdStyle}>B67890</td><td style={tdStyle}>2025-12-01</td><td style={tdStyle}><span style={statusPendingStyle}>Pending Review</span></td><td style={tdStyle}>$1200.00</td></tr>
                <tr><td style={tdStyle}>C13579</td><td style={tdStyle}>2025-12-05</td><td style={tdStyle}><span style={statusDeniedStyle}>Denied</span></td><td style={tdStyle}>$200.00</td></tr>
            </tbody>
        </table>
    </div>
);

// =========================================================
// 2. MAIN DASHBOARD CONTAINER
// =========================================================

const PatientDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('Loading...'); 
    const [activeModule, setActiveModule] = useState<string>('My Appointments');
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Menu Items
    const menuItems = [
        { name: 'My Appointments', icon: '🗓️', component: ModuleMyAppointments },
        { name: 'Book Appointment', icon: '🏥', component: ModuleBookAppointment },
        { name: 'Upload Card', icon: '💳', component: ModuleUploadCard },
        { name: 'Renew Card', icon: '🔄', component: ModuleRenewCard },
        { name: 'Track Claims', icon: '📈', component: ModuleTrackClaims },
    ];

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            navigate('/login');
            return;
        }

        const loadUserData = async () => { 
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                if (decoded.role !== 'Patient') {
                    alert(`Access Denied: Logged in as ${decoded.role}. Redirecting to login.`);
                    localStorage.removeItem('jwtToken');
                    navigate('/login');
                    return;
                }
                
                // --- ASYNCHRONOUS NAME FETCH ---
                const fetchedName = await fetchUserNameFromBackend();
                setUserName(fetchedName);
                // ------------------------------
    
            } catch (error) {
                console.error('User data loading failed:', error);
                // Redirect user if token is invalid/expired
                localStorage.removeItem('jwtToken');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        loadUserData(); // Call the function
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    const handleMenuItemClick = (moduleName: string) => {
        setActiveModule(moduleName);
        setIsMenuOpen(false); // Close menu on selection
    };

    const renderActiveModule = () => {
        const ModuleComponent = menuItems.find(item => item.name === activeModule)?.component;
        return ModuleComponent ? <ModuleComponent /> : <h2>Module Not Found</h2>;
    };

    if (loading) {
        // Show the loading state while the name is being fetched
        return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading dashboard...</p>;
    }

    return (
        <div style={fullPageStyle}>
            <header style={headerStyle}>
                <div style={logoContainerStyle}>
                    {/* HAMBURGER MENU BUTTON */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={hamburgerButtonStyle}
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                    {/* BRANDING: InsureGo Platform */}
                    <h1 style={logoTextStyle}>
                        InsureGo
                    </h1>
                </div>

                {/* CENTERED: PATIENT DASHBOARD TITLE */}
                <h2 style={centeredTitleStyle}>
                    Patient Dashboard
                </h2>

                <div style={userInfoStyle}>
                    {/* Display dynamically fetched Name */}
                    <span style={userDisplayNameStyle}>Welcome, {userName}</span>
                    <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
                </div>
            </header>

            <div style={mainContentAreaStyle}>
                {/* Overlay/Sliding Menu (Hamburger Menu Content) */}
                <nav style={getSlidingMenuStyle(isMenuOpen)}>
                    <div style={sidebarHeaderStyle}>
                        Menu
                    </div>
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => handleMenuItemClick(item.name)}
                            style={{
                                ...menuItemBaseStyle,
                                backgroundColor: activeModule === item.name ? '#007bff' : 'transparent',
                                color: activeModule === item.name ? 'white' : '#b3e0ff',
                                fontWeight: activeModule === item.name ? 'bold' : 'normal',
                                borderLeft: activeModule === item.name ? '5px solid #88E0EF' : 'none'
                            }}
                        >
                            <span style={{ marginRight: '12px' }}>{item.icon}</span> {item.name}
                        </div>
                    ))}
                </nav>

                {/* Main Content Area */}
                <main style={contentAreaStyle}>
                    {renderActiveModule()}
                </main>
            </div>
            <footer style={footerStyle}>
                <p>&copy; 2025 InsureGo Platform. Your secure patient dashboard.</p>
            </footer>
        </div>
    );
};

// =========================================================
// 3. INLINE STYLES DEFINITIONS (The Theming)
// =========================================================

// --- Theme Colors ---
const COLOR_PRIMARY = '#007bff';   // Health Blue
const COLOR_SECONDARY = '#6c757d'; // Gray/Dark for secondary actions
const COLOR_BACKGROUND = '#f8f9fa';// Lightest background
const COLOR_HEADER = '#0056b3';    // Darker Blue for Header
const COLOR_SIDEBAR = '#1e3c72';   // Deep Navy Blue

const fullPageStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Open Sans, Arial, sans-serif',
    backgroundColor: COLOR_BACKGROUND,
};

const headerStyle: React.CSSProperties = {
    backgroundColor: COLOR_HEADER,
    color: 'white',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'relative',
};

const logoContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
};

const logoTextStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '1.5em',
    fontWeight: '300',
    color: '#88E0EF', 
    marginLeft: '10px'
};

const centeredTitleStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
    fontSize: '1.6em',
    fontWeight: '600',
    color: 'white',
};


const userInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
};

const userDisplayNameStyle: React.CSSProperties = {
    marginRight: '15px',
    color: '#b3e0ff',
    fontSize: '1.05em',
    fontWeight: '500'
}

const logoutButtonStyle: React.CSSProperties = {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginLeft: '20px',
    transition: 'background-color 0.2s'
};

const mainContentAreaStyle: React.CSSProperties = {
    display: 'flex',
    flexGrow: 1,
    position: 'relative'
};

// --- HAMBURGER MENU STYLES ---

const sidebarWidth = '280px';

const hamburgerButtonStyle: React.CSSProperties = {
    fontSize: '24px',
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '5px',
    lineHeight: '1',
    fontWeight: 'normal',
};

const getSlidingMenuStyle = (isOpen: boolean): React.CSSProperties => ({
    position: 'fixed',
    top: '80px',
    left: isOpen ? '0' : `-${sidebarWidth}`,
    width: sidebarWidth,
    height: 'calc(100vh - 80px)',
    backgroundColor: COLOR_SIDEBAR,
    color: 'white',
    paddingTop: '20px',
    boxShadow: '3px 0 10px rgba(0,0,0,0.3)',
    transition: 'left 0.3s ease-in-out',
    zIndex: 1000,
});

// --- REST OF THE STYLES ---

const sidebarHeaderStyle: React.CSSProperties = {
    padding: '15px 25px',
    fontSize: '1.2em',
    fontWeight: '600',
    borderBottom: `1px solid ${COLOR_PRIMARY}`
}

const menuItemBaseStyle: React.CSSProperties = {
    padding: '15px 25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1.05em',
    display: 'flex',
    alignItems: 'center',
};

const contentAreaStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: '40px',
    backgroundColor: COLOR_BACKGROUND,
    overflowY: 'auto',
    marginLeft: '0'
};

const footerStyle: React.CSSProperties = {
    backgroundColor: '#e9ecef',
    padding: '10px 30px',
    textAlign: 'center',
    color: COLOR_SECONDARY,
    fontSize: '0.9em',
    borderTop: '1px solid #dee2e6'
}

const labelStyle: React.CSSProperties = {
    fontWeight: '600',
    color: COLOR_SECONDARY
}

const inputStyle: React.CSSProperties = {
    padding: '12px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    fontSize: '1em',
    transition: 'border-color 0.2s, box-shadow 0.2s'
}

const moduleButtonBase: React.CSSProperties = {
    padding: '12px 25px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    marginTop: '15px',
    fontWeight: '600',
    transition: 'background-color 0.2s, transform 0.1s'
}

const moduleButtonPrimaryStyle: React.CSSProperties = {
    ...moduleButtonBase,
    backgroundColor: COLOR_PRIMARY,
    color: 'white',
};

const moduleButtonSecondaryStyle: React.CSSProperties = {
    ...moduleButtonBase,
    backgroundColor: COLOR_SECONDARY,
    color: 'white',
    marginLeft: '10px'
};

const moduleButtonDangerStyle: React.CSSProperties = {
    ...moduleButtonBase,
    backgroundColor: '#dc3545',
    color: 'white',
};

const alertWarningStyle: React.CSSProperties = {
    padding: '15px',
    backgroundColor: '#fff3cd',
    color: '#856404',
    borderLeft: '5px solid #ffc107',
    borderRadius: '8px',
    margin: '15px 0',
    fontWeight: '500',
};

const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
};

const thStyle: React.CSSProperties = {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '2px solid #adb5bd',
    backgroundColor: '#e9ecef',
    fontWeight: 'bold',
    color: '#343a40'
};

const tdStyle: React.CSSProperties = {
    padding: '15px',
    textAlign: 'left',
    borderBottom: '1px solid #f1f1f1',
};

const statusBaseStyle: React.CSSProperties = {
    padding: '5px 10px',
    borderRadius: '15px',
    fontWeight: '600',
    fontSize: '0.85em',
    display: 'inline-block'
}

const statusConfirmedStyle: React.CSSProperties = {
    ...statusBaseStyle,
    backgroundColor: '#28a745',
    color: 'white'
}

const statusApprovedStyle: React.CSSProperties = {
    ...statusBaseStyle,
    backgroundColor: '#28a745',
    color: 'white'
}

const statusPendingStyle: React.CSSProperties = {
    ...statusBaseStyle,
    backgroundColor: '#ffc107',
    color: '#333'
}

const statusDeniedStyle: React.CSSProperties = {
    ...statusBaseStyle,
    backgroundColor: '#dc3545',
    color: 'white'
}


export default PatientDashboard;