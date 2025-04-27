import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { saveToken, saveUsername } from '../utils/auth';
// Inside Login component:

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';



const Login = () => {
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/'; // fallback route

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://print-gurus.onrender.com/api/token/', userDetails);
      const { access } = response.data;
  
      saveToken(access);
      saveUsername(userDetails.username);
  
      const redirectTo = location.state?.from || '/';
      
      navigate(redirectTo);
      window.location.reload(); 
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
    setUserDetails({ username: '', password: '' });
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/background.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: 'white',
        py: 3,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350, background: 'rgba(255, 255, 255, 0.25)' }}>
        <Typography variant="h5" gutterBottom align="center">Login</Typography>

        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="username"
            value={userDetails.username}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: 'rgba(73, 12, 85, 0.8)' }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'underline', color: 'rgba(73, 12, 85, 0.8)' }}>
            Signup instead
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
