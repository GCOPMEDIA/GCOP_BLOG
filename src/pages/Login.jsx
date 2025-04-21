import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Details:', userDetails);
    setUserDetails({username: '',
    password: '',})

    // Here, you can send userDetails to your Django backend
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/images/background.png')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundAttachment: "fixed",
                      color: "white",
                      py: 3,}}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
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
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
  Don't have an account?{' '}
  <Link to="/signup" style={{ textDecoration: 'underline', color: '#4A148C' }}>
    Signup instead
  </Link>
</Typography>

      </Paper>
    </Box>
  );
};

export default Login;
