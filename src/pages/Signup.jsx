import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Fade,
} from '@mui/material';


const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    // Submit to Django backend here
    setFormData({ username: '', email: '', password: '' });
    setStep(1);
    navigate('/login'); // Redirect to login page after signup
  };

  const renderField = () => {
    switch (step) {
      case 1:
        return (
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
          />
        );
      case 2:
        return (
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            type="email"
          />
        );
      case 3:
        return (
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            type="password"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('/images/background.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: 'white',
        py: 3,
      }}
    >
      <Paper elevation={4} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <Fade in timeout={500}>
            <Box>{renderField()}</Box>
          </Fade>

          {step < 3 ? (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: 'rgba(73, 12, 85, 0.8)' }}
              onClick={handleNext}
              disabled={!formData[step === 1 ? 'username' : 'email']}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: 'rgba(98, 15, 115, 0.8)' }}
              disabled={!formData.password}
            >
              Submit
            </Button>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
