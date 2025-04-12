import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    handleClose(); // Close menu
    navigate('/login');
  };

  const menuItems = user
    ? [
        { label: 'Profile', path: '/profile' },
        { label: 'Logout', action: handleLogout }
      ]
    : [
        { label: 'Login', path: '/login' },
        { label: 'Signup', path: '/signup' }
      ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/" title="Kasiglahan Annex Branch">
          <label className="font-extrabold tracking-wider md:text-lg lg:text-xl cursor-pointer hover:text-red-500">
            Kasiglahan Library
          </label>
        </Link>

        {/* Hamburger menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Center links */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'flex' },
            gap: 3
          }}
        >
          <Link to="/about" title="About Us">
            <InfoIcon sx={{ fontSize: 30 }} className="hover:text-blue-500" />
          </Link>
          <Link to="/book" title="Books">
            <BookIcon sx={{ fontSize: 30 }} className="hover:text-blue-500" />
          </Link>
          <Link to="/contact" title="Contact Us">
            <EmailIcon sx={{ fontSize: 30 }} className="hover:text-blue-600" />
          </Link>
        </Box>

        {/* Right-side Profile & Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {user && (
            <Typography sx={{ mr: 1 }} variant="subtitle1">
              {user.name || user.email}
            </Typography>
          )}
          <Tooltip title="Options">
            <IconButton
              onClick={handleMenu}
              color="inherit"
              size="large"
              edge="end"
            >
              <AccountCircle />
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => {
                  handleClose();
                  if (item.action) item.action();
                  if (item.path) navigate(item.path);
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
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
          <Link to="/about">
            <MenuItem>About Us</MenuItem>
          </Link>
          <Link to="/book">
            <MenuItem>Books</MenuItem>
          </Link>
          <Link to="/contact">
            <MenuItem>Contact Us</MenuItem>
          </Link>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
