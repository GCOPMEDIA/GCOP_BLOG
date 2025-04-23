import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
  const [Changes,setChanges] = useState(true)
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    f_name:'',
    l_name:'',
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
  
    validateField(name, value);
    setChanges(false);
  };
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
    console.log(showPassword)
  };
  
  
  const validateField = (name, value) => {
    let error = '';
  
    switch (name) {
      case 'f_name':
      case 'l_name':
        if (value.trim().length < 2) error = 'Must be at least 2 characters';
        break;
      case 'username':
        if (value.trim().length < 3) error = 'Username must be at least 3 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = 'Invalid email address';
        break;
      case 'password':
        if (value.length < 8) error = 'Password must be at least 8 characters';
        break;
      default:
        break;
    }
  
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  
    return error === '';
  };
  

  const handleNext = () => {
    const fieldNames = ['f_name', 'l_name', 'username', 'email', 'password'];
    const currentField = fieldNames[step - 1];
    const isValid = validateField(currentField, formData[currentField]);
  
    if (isValid && step < 5) {
      setStep(step + 1);
      setChanges(true);
    }
  };
  


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://print-gurus.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        
        setFormData({
          f_name: '',
          l_name: '',
          username: '',
          email: '',
          password: '',
        });
        setStep(1);
        navigate('/login'); // Redirect after successful signup
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        alert('Signup failed. Please check your inputs or try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Network error. Please try again.');
    }
  };
  

  const renderField = () => {
    switch (step) {
        case 1:
            return (
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                name="f_name"
                value={formData.f_name}
                onChange={handleChange}
                margin="normal"
                background="rgba(255, 255, 255, 0.25)"
                error={Boolean(formErrors.f_name)}
                helperText={formErrors.f_name}
              />
            );
            case 2:
        return (
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            name="l_name"
            value={formData.l_name}
            onChange={handleChange}
            margin="normal"
            background="rgba(255, 255, 255, 0.25)"
            error={Boolean(formErrors.l_name)}
            helperText={formErrors.l_name}
          />
        );
            case 3:
                return (
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    margin="normal"
                    background="rgba(255, 255, 255, 0.25)"
                    error={Boolean(formErrors.username)}
                    helperText={formErrors.username}
                  />
                );
      case 4:
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
            background="rgba(255, 255, 255, 0.25)"
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />
        );
      case 5:
        return (
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            type={showPassword ? "text" : "password"}
            background="rgba(255, 255, 255, 0.25)"    
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={toggleShowPassword}
              edge="end"
              sx={{ color: 'white' }}
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
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
      <Paper elevation={4} sx={{ padding: 4, width: 350, background: "rgba(255, 255, 255, 0.25)" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
        <Fade in timeout={500}>
            <Box>{renderField()}</Box>
          </Fade>

          {step < 5 ? (
            <Fade in timeout={5000}>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: 'rgba(73, 12, 85, 0.8)' }}
              onClick={handleNext}
              disabled={Changes }
            >
              Next
            </Button></Fade>
          ) : (
            <Fade in timeout={500}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: 'rgba(98, 15, 115, 0.8)' }}
              disabled={Boolean(formErrors.f_name)}
            >
              Submit
            </Button></Fade>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
