import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  CssBaseline,
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

function DrawerContent({ username, onNavigate, items = NAV_ITEMS }) {
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
        {items.map((item) => (
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

DrawerContent.propTypes = {
  username: PropTypes.string,
  onNavigate: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      abbr: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

function Layout({ children, houseItem = false }) {
  const { username: authUsername, logout } = useAuth();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);

  const username = authUsername;

  // If houseItem is true, include Home in navigation items
  const menuItems = houseItem 
    ? [...NAV_ITEMS] 
    : NAV_ITEMS.filter(item => item.path !== ROUTES.HOME);

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
    <Box sx={{ display: 'flex', overflowX: 'hidden', maxWidth: '100vw' }}>
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
        <Toolbar variant="dense" sx={{ minHeight: 48, px: { xs: 1, sm: 2 } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleToggle}
            sx={{ mr: { xs: 0.5, sm: 1 } }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography
            variant="caption"
            noWrap
            fontWeight={600}
            sx={{
              flexGrow: 1,
              letterSpacing: '0.05em',
              color: '#fff',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
            }}
          >
            COMPANIA PRUEBA
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{
              mr: { xs: 1, sm: 2 },
              color: '#fff',
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              maxWidth: { xs: '80px', sm: 'none' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {username || 'Nombre de Usuario'}
          </Typography>
          <Box
            onClick={handleLogout}
            sx={{
              bgcolor: '#fff',
              color: '#001529',
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              flexShrink: 0,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.92)',
                transform: 'scale(1.05)',
              },
            }}
          >
            <ExitToAppIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Side Drawer ─────────────────────────────────────────── */}
      <Box
        component="nav"
        sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}
      >
        {/* Mobile: temporary */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { ...drawerSx, mt: { xs: '48px', sm: '64px' } },
          }}
        >
          <DrawerContent username={username} onNavigate={handleNavigate} items={menuItems} />
        </Drawer>

        {/* Desktop: permanent */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': drawerSx,
          }}
          open
        >
          <Toolbar variant="dense" /> {/* spacer for AppBar height */}
          <DrawerContent username={username} onNavigate={handleNavigate} items={menuItems} />
        </Drawer>
      </Box>

      {/* ── Main content ────────────────────────────────────────── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { xs: '100%', lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          minWidth: 0,
          minHeight: '100vh',
          mt: { xs: '48px', sm: '64px' },
          bgcolor: 'background.default',
          overflowX: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>

  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  houseItem: PropTypes.bool,
};

export default Layout;
