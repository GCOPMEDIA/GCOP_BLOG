import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navLinks = [
    { name: 'Home', url: '/', external: false },
    { name: 'About', url: '/about/', external: false },
    { name: 'Login/Signup', url: '/login', external: false },
    { name: 'GCOP Gallery', url: 'https://gcopmedia.pixieset.com/gcopinternationalstemporarygallery/', external: true },
  ];
  

  return (
    <>
      <AppBar position="static" sx={{ background: 'rgba(73, 12, 85, 0.8)', padding: '10px 0' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            GCOP's Blog
          </Typography>

          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                <Box sx={{ width: 250, padding: 2 }}>
                  <List>
                  {navLinks.map((link, index) => (
  <ListItem
    button
    key={index}
    component={link.external ? 'a' : RouterLink}
    href={link.external ? link.url : undefined}
    to={!link.external ? link.url : undefined}
    onClick={toggleDrawer}
    target={link.external ? '_blank' : undefined}
    rel={link.external ? 'noopener noreferrer' : undefined}
  >
    <ListItemText primary={link.name} />
  </ListItem>
))}

                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 3 }}>
            {navLinks.map((link, index) => (
  <Typography
    key={index}
    component={link.external ? 'a' : RouterLink}
    href={link.external ? link.url : undefined}
    to={!link.external ? link.url : undefined}
    target={link.external ? '_blank' : undefined}
    rel={link.external ? 'noopener noreferrer' : undefined}
    sx={{
      color: 'white',
      textDecoration: 'none',
      fontWeight: 500,
      '&:hover': {
        textDecoration: 'underline',
      },
    }}
  >
    {link.name}
  </Typography>
))}

            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Optional Scroll Top Button */}
      <Box
        id="scroll-top"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </Box>

      {/* Optional Preloader */}
      <Box
        id="preloader"
        sx={{
          background: 'rgba(0, 0, 0, 0.7)',
          padding: 2,
          color: 'white',
          textAlign: 'center',
          display: 'none', // Change to "block" if you want it active
        }}
      >
        Loading...
      </Box>
    </>
  );
};

export default Header;
