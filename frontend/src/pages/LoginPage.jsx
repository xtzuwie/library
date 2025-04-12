import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/authStore.js";
import { toast } from "react-hot-toast";
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { message } = await signin(email, password);
      toast.success(message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', px: 4, py: 8 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        Log In
      </Typography>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{ bgcolor: '#fff', borderColor: '#388e3c', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#388e3c' }}}}
        />
        
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{ bgcolor: '#fff', borderColor: '#388e3c', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#388e3c' }}}}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ bgcolor: '#E7FBB4', color: '#000', py: 2, fontWeight: 'bold', mt: 3, '&:hover': { bgcolor: '#c4e48b' }}}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link to={'/signup'} style={{ textDecoration: 'none', fontWeight: 'bold', color: '#388e3c' }}>
            Sign Up
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginPage;
