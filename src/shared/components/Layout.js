import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../features/auth/context/AuthContext';
import { ROUTES } from '../../constants/routes';

const DRAWER_WIDTH = 250;

const NAV_ITEMS = [
  { label: 'INICIO',            abbr: 'IN', color: '#00b0ff', path: ROUTES.HOME },
  { label: 'Consulta Clientes', abbr: 'CC', color: '#00b0ff', path: ROUTES.CLIENTS },
];

function DrawerContent({ username, onNavigate }) {
  return (
    <Box sx={{ height: '100%', overflowY: 'auto', bgcolor: '#f4f7f9' }}>
      {/* User avatar + name */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 3,
          pb: 3,
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 130, color: '#333' }} />
        <Typography variant="body1" fontWeight={700} sx={{ mt: 1, color: '#000', fontSize: '1.2rem' }}>
          {username || 'Nombre de Usuario'}
        </Typography>
      </Box>

      {/* MENÚ Header */}
      <Box 
        sx={{ 
          py: 2.5, 
          textAlign: 'center', 
          borderTop: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
          bgcolor: '#f4f7f9'
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: '#000', letterSpacing: '0.02em', fontSize: '1.6rem' }}
        >
          MENÚ
        </Typography>
      </Box>

      {/* Nav menu */}
      <List disablePadding sx={{ pt: 2 }}>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => onNavigate(item.path)}
            sx={{ 
              py: 1,
              px: 4,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
            }}
          >
            <Typography
              sx={{
                width: 35,
                color: item.color,
                fontWeight: 800,
                fontSize: '1rem',
                flexShrink: 0,
                mr: 0.5
              }}
            >
              {item.abbr}
            </Typography>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ 
                variant: 'body1', 
                fontWeight: 500,
                color: '#546e7a',
                fontSize: '1.1rem'
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

function Layout({ children }) {
  const { username, logout } = useAuth();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => setMobileOpen((prev) => !prev);

  const handleNavigate = (path) => {
    setMobileOpen(false);
    history.push(path);
  };

  const handleLogout = () => {
    logout();
    history.push(ROUTES.LOGIN);
  };

  const drawerSx = {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    bgcolor: '#f0f2f5', // Lighter grey for the drawer background as seen in images
    color: 'text.primary',
    borderRight: '1px solid rgba(0,0,0,0.12)',
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* ── Top AppBar ─────────────────────────────────────────── */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#001529', // Dark navy from the image
          boxShadow: 'none',
          borderBottom: '3px solid #00a0e9', // Brighter blue accent line
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: 48 }}>
          <IconButton color="inherit" edge="start" onClick={handleToggle} sx={{ mr: 1 }}>
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography
            variant="caption"
            noWrap
            fontWeight={600}
            sx={{ flexGrow: 1, letterSpacing: '0.05em', color: '#fff', fontSize: '0.8rem' }}
          >
            COMPANIA PRUEBA
          </Typography>
          <Typography
            variant="body2"
            sx={{ mr: 2, color: '#fff', fontSize: '0.85rem' }}
          >
            {username || 'Nombre de Usuario'}
          </Typography>
          <Box
            onClick={handleLogout}
            sx={{
              bgcolor: '#fff',
              color: '#001529',
              width: 32,
              height: 32,
              borderRadius: 3, // M3 style: small containers use standard rounded corners (8-12px -> 3*8px)
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': { 
                bgcolor: 'rgba(255,255,255,0.92)',
                transform: 'scale(1.05)'
              },
            }}
          >
            <ExitToAppIcon sx={{ fontSize: 18 }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Side Drawer ─────────────────────────────────────────── */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile: temporary */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { ...drawerSx, mt: '64px' },
          }}
        >
          <DrawerContent username={username} onNavigate={handleNavigate} />
        </Drawer>

        {/* Desktop: permanent */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': drawerSx,
          }}
          open
        >
          <Toolbar /> {/* spacer for AppBar height */}
          <DrawerContent username={username} onNavigate={handleNavigate} />
        </Drawer>
      </Box>

      {/* ── Main content ────────────────────────────────────────── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          mt: '64px',
          bgcolor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
