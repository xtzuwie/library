import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';

import InfoIcon from '@mui/icons-material/Info';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    handleClose();
    navigate('/login');
  };

  const menuItems = user
    ? [
        { label: 'Profile', path: '/profile' },
        { label: 'Logout', action: handleLogout }
      ]
    : [
        { label: 'Login', path: '/login' }
      ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo/Brand */}
        <Link to="/" title="Kasiglahan Annex Branch">
          <label className="font-extrabold tracking-wider md:text-lg lg:text-xl cursor-pointer hover:text-red-500">
            Kasiglahan Library
          </label>
        </Link>

        {/* Hamburger for mobile */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Center Nav Items */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'flex' },
            gap: 3
          }}
        >
          {!user && (
            <>
              <Link to="/" title="Home">
                <Box
                  className={`flex items-center gap-1 cursor-pointer ${
                    location.pathname === '/' ? 'text-blue-400 font-semibold underline underline-offset-4' : 'hover:text-orange-200'
                  }`}
                >
                  <span className="text-md font-bold">Home</span>
                  <HomeIcon sx={{ fontSize: 30 }} />
                </Box>
              </Link>

              <Link to="/about" title="About Us">
                <Box
                  className={`flex items-center gap-1 cursor-pointer ${
                    location.pathname === '/about' ? 'text-blue-400 font-semibold underline underline-offset-4' : 'hover:text-orange-200'
                  }`}
                >
                  <span className="text-md font-bold">About Us</span>
                  <InfoIcon sx={{ fontSize: 30 }} />
                </Box>
              </Link>

              <Link to="/book" title="Books">
            <Box
              className={`flex items-center gap-1 cursor-pointer ${
                location.pathname === '/book' ? 'text-blue-400 font-semibold underline underline-offset-4' : 'hover:text-orange-200'
              }`}
            >
              <span className="text-md font-bold">Books</span>
              <LibraryBooksIcon sx={{ fontSize: 30 }} />
            </Box>
          </Link>
            </>
          )}

          {/* Add Books link - only visible for logged in users */}
          {user && (
            <Link to="/inventory" title="Add Books">
              <Box
                className={`flex items-center gap-1 cursor-pointer ${
                  location.pathname === '/addbooks' ? 'text-blue-400 font-semibold underline underline-offset-4' : 'hover:text-orange-200'
                }`}
              >
                <span className="text-md font-bold">Add Books</span>
                <LibraryBooksIcon sx={{ fontSize: 30 }} />
              </Box>
            </Link>
          )}
        </Box>

        {/* Modified Right-side Profile / Login */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {user ? (
            <Box>
              <Tooltip title={user.name || 'Profile'}>
                <Avatar
                  src={user?.image || `https://ui-avatars.com/api/?name=${user.name}`}
                  alt={user.name}
                  onClick={handleMenu}
                  sx={{ 
                    cursor: 'pointer', 
                    width: 40, 
                    height: 40,
                    '&:hover': {
                      opacity: 0.8,
                      transition: 'opacity 0.2s'
                    }
                  }}
                />
              </Tooltip>
              <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end">
                <ClickAwayListener onClickAway={handleClose}>
                  <Paper
                    elevation={4}
                    sx={{
                      mt: 1.5,
                      p: 2,
                      width: 260,
                      borderRadius: 2,
                      zIndex: 1300
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={user?.image || `https://ui-avatars.com/api/?name=${user.name}`}
                        alt={user.name}
                        sx={{ width: 48, height: 48 }}
                      />
                      <Box>
                        <Typography fontWeight="bold">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        handleLogout();
                        handleClose();
                      }}
                      sx={{
                        color: 'primary.main',
                        borderColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white'
                        }
                      }}
                    >
                      Sign Out
                    </Button>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
                sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => {
                toggleDrawer();
                if (item.action) item.action();
                if (item.path) navigate(item.path);
              }}
            >
              {item.label}
            </MenuItem>
          ))}
          {/* Add Books MenuItem - only visible for logged in users */}
          {user && (
            <Link to="/inventory">
              <MenuItem>Add Books</MenuItem>
            </Link>
          )}
          {!user && (
            <>
              <Link to="/about">
                <MenuItem>About Us</MenuItem>
              </Link>
              <Link to="/contact">
                <MenuItem>Contact Us</MenuItem>
              </Link>
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
