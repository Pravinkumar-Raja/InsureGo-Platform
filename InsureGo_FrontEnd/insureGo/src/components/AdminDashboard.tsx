// // src/components/AdminDashboard.tsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; 
// import AdminLayout from './AdminLayout'; // Import the new layout

// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button';

// // --- Interfaces ---
// interface JwtPayload { sub: string; role: string; exp: number; }

// // =========================================================
// // 1. ADMIN MODULE COMPONENTS
// // =========================================================

// const ModuleRegistrationAnalytics: React.FC = () => (
//     <Box>
//         <Typography variant="h6" gutterBottom>System Overview</Typography>
//         <Grid container spacing={3}>
//             <Grid item xs={12} md={4}>
//                 <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
//                     <Typography variant="h3" color="primary">1,245</Typography>
//                     <Typography variant="subtitle1">Total Users</Typography>
//                 </Paper>
//             </Grid>
//             <Grid item xs={12} md={4}>
//                 <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
//                     <Typography variant="h3" color="success.main">85</Typography>
//                     <Typography variant="subtitle1">New Last 7 Days</Typography>
//                 </Paper>
//             </Grid>
//             <Grid item xs={12} md={4}>
//                 <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
//                     <Typography variant="h3" color="warning.main">90% / 10%</Typography>
//                     <Typography variant="subtitle1">Patient / Doctor Ratio</Typography>
//                 </Paper>
//             </Grid>
//         </Grid>
//     </Box>
// );

// const ModuleUserAccounts: React.FC = () => (
//     <Box>
//         <Typography variant="h6" gutterBottom>User Accounts Management</Typography>
//         <TableContainer component={Paper}>
//             <Table size="small">
//                 <TableHead sx={{ bgcolor: '#f5f5f5' }}>
//                     <TableRow>
//                         <TableCell>Email</TableCell>
//                         <TableCell>Role</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Actions</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     <TableRow><TableCell>testuser@example.com</TableCell><TableCell>Patient</TableCell><TableCell>Verified</TableCell><TableCell><Button variant="outlined" size="small">View</Button></TableCell></TableRow>
//                     <TableRow><TableCell>dr.jones@clinic.com</TableCell><TableCell>Doctor</TableCell><TableCell>Active</TableCell><TableCell><Button variant="outlined" size="small">View</Button></TableCell></TableRow>
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     </Box>
// );

// const ModulePendingClaims: React.FC = () => (
//     <Box>
//         <Typography variant="h6" gutterBottom>Pending Claims Review</Typography>
//         <TableContainer component={Paper}>
//             <Table size="small">
//                 <TableHead sx={{ bgcolor: '#f5f5f5' }}>
//                     <TableRow>
//                         <TableCell>Claim ID</TableCell>
//                         <TableCell>User Email</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Date Filed</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     <TableRow><TableCell>C9876</TableCell><TableCell>user@example.com</TableCell><TableCell>Review Pending</TableCell><TableCell>2025-12-09</TableCell></TableRow>
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     </Box>
// );

// // =========================================================
// // 2. MAIN DASHBOARD CONTAINER
// // =========================================================

// const componentMap: { [key: string]: React.FC } = {
//     'Analytics': ModuleRegistrationAnalytics,
//     'User Accounts': ModuleUserAccounts,
//     'Pending Claims': ModulePendingClaims,
//     'Verification Audit': ModuleRegistrationAnalytics,
// };

// const AdminDashboard: React.FC = () => {
//     const navigate = useNavigate();
//     const [userEmail, setUserEmail] = useState<string | null>(null);
//     const [activeModule, setActiveModule] = useState<string>('Analytics');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const token = localStorage.getItem('jwtToken');
//         if (!token) {
//             navigate('/login');
//             return;
//         }

//         try {
//             const decoded = jwtDecode<JwtPayload>(token);
//             if (decoded.role !== 'Admin') {
//                 alert('Access Denied: You must be an Administrator.');
//                 localStorage.removeItem('jwtToken');
//                 navigate('/login');
//                 return;
//             }
//             setUserEmail(decoded.sub);
//         } catch (error) {
//             console.error('JWT decoding failed:', error);
//             localStorage.removeItem('jwtToken');
//             navigate('/login');
//         } finally {
//             setLoading(false);
//         }
//     }, [navigate]);

//     const RenderComponent = componentMap[activeModule] || (() => <Typography variant="h5">Select a Module</Typography>);

//     if (loading) {
//         return <Typography sx={{ textAlign: 'center', mt: 5 }}>Authenticating Admin...</Typography>;
//     }

//     return (
//         <AdminLayout
//             activeModule={activeModule}
//             setActiveModule={setActiveModule}
//             userEmail={userEmail!}
//         >
//             <RenderComponent />
//         </AdminLayout>
//     );
// };

// export default AdminDashboard;