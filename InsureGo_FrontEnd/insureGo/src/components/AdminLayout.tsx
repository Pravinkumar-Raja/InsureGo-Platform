// // src/components/AdminLayout.tsx

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { alpha, useTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';
// import SecurityIcon from '@mui/icons-material/Security';
// import LogoutIcon from '@mui/icons-material/Logout';
// import PolicyIcon from '@mui/icons-material/Policy';
// import SettingsIcon from '@mui/icons-material/Settings';

// // --- Placeholder Components for the Pro Template Structure ---
// // NOTE: These mimic the structure from the MUI Pro Template snippet.
// const AppNavbar: React.FC<any> = () => <></>; // Placeholder for a standard navbar
// const Header: React.FC<any> = ({ title, children }) => (
//     <Box sx={{ p: 3, borderBottom: '1px solid #eee', bgcolor: 'white' }}>
//         <Typography variant="h4" component="h1" sx={{ color: '#1e3c72', fontWeight: 600 }}>
//             {title}
//         </Typography>
//         {children}
//     </Box>
// );

// // --- Sidebar Menu Data ---
// const ADMIN_MENU_ITEMS = [
//     { name: 'Analytics', icon: <DashboardIcon />, path: 'Analytics' },
//     { name: 'User Accounts', icon: <GroupIcon />, path: 'User Accounts' },
//     { name: 'Pending Claims', icon: <PolicyIcon />, path: 'Pending Claims' },
//     { name: 'Verification Audit', icon: <SecurityIcon />, path: 'Verification Audit' },
// ];

// const DRAWER_WIDTH = 280;

// interface AdminLayoutProps {
//     children: React.ReactNode;
//     activeModule: string;
//     setActiveModule: (module: string) => void;
//     userEmail: string;
// }

// const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeModule, setActiveModule, userEmail }) => {
//     const navigate = useNavigate();
//     const theme = useTheme();

//     const handleLogout = () => {
//         localStorage.removeItem('jwtToken');
//         navigate('/login');
//     };

//     const renderSidebar = () => (
//         <Box sx={{ 
//             width: DRAWER_WIDTH, 
//             height: '100%', 
//             bgcolor: theme.palette.mode === 'dark' ? '#1c2025' : '#212B36', 
//             color: 'white',
//             flexShrink: 0
//         }}>
//             <Stack direction="row" alignItems="center" sx={{ p: 2, bgcolor: '#1e3c72' }}>
//                 <DashboardIcon sx={{ color: '#007bff', mr: 1 }} />
//                 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//                     InsureGo Admin
//                 </Typography>
//             </Stack>

//             <List disablePadding>
//                 {ADMIN_MENU_ITEMS.map((item) => (
//                     <ListItem key={item.name} disablePadding>
//                         <ListItemButton
//                             onClick={() => setActiveModule(item.name)}
//                             selected={activeModule === item.name}
//                             sx={{
//                                 '&.Mui-selected': {
//                                     backgroundColor: alpha(theme.palette.primary.main, 0.15),
//                                     color: theme.palette.primary.main,
//                                     fontWeight: 'bold',
//                                     borderLeft: `5px solid ${theme.palette.primary.main}`,
//                                     '&:hover': {
//                                         backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                                     }
//                                 },
//                                 color: 'white',
//                             }}
//                         >
//                             <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
//                             <ListItemText primary={item.name} />
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
            
//             <Divider sx={{ my: 1, bgcolor: '#454f5b' }} />

//             <List disablePadding>
//                 <ListItem disablePadding>
//                     <ListItemButton onClick={handleLogout} sx={{ color: '#dc3545' }}>
//                         <ListItemIcon sx={{ color: '#dc3545' }}><LogoutIcon /></ListItemIcon>
//                         <ListItemText primary="Logout" />
//                     </ListItemButton>
//                 </ListItem>
//             </List>

//             <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
//                 <Typography variant="caption" color="text.secondary">
//                     Admin: {userEmail}
//                 </Typography>
//             </Box>
//         </Box>
//     );

//     return (
//         <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', bgcolor: '#f4f6f8' }}>
//             <CssBaseline />
//             <AppNavbar /> {/* Top App Bar placeholder */}

//             {/* Main Application Structure */}
//             <Stack direction="row" sx={{ width: '100%' }}>
//                 {renderSidebar()}
                
//                 {/* Main Content Area */}
//                 <Box
//                     component="main"
//                     sx={{
//                         flexGrow: 1,
//                         p: 3,
//                         width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
//                         overflow: 'auto',
//                     }}
//                 >
//                     <Header title={activeModule} />
//                     <Box sx={{ mt: 3 }}>
//                         {children}
//                     </Box>
//                 </Box>
//             </Stack>
//         </Box>
//     );
// };

// export default AdminLayout;