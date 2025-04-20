import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Stack
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: 'rgba(59, 2, 70, 0.8)',
        color: 'white',
        padding: '40px 0 20px',
      }}
    >
      <Container>
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left Column - Social Links */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              <Link href="/about" underline="none" color="inherit">
                GCOP INT
              </Link>
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
              <IconButton
                component="a"
                href="https://www.youtube.com/@godschurchofpeaceinternati4179"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white' }}
              >
                <YouTubeIcon fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/peace.ghana.54/"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white' }}
              >
                <InstagramIcon fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.facebook.com/GCOPMEDIA"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white' }}
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.tiktok.com/@peaceghana"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white' }}
              >
                <i className="bi bi-tiktok" style={{ fontSize: 28 }} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Right Column - Radio */}
          <Grid item xs={12} md={6} lg={4} textAlign={{ xs: 'center', md: 'right' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              GCOP RADIO
              <IconButton
                component="a"
                href="https://apps.apple.com/gh/app/gcop-radio/id6472612571"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white', ml: 2 }}
              >
                <AppleIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://drive.google.com/file/d/1zt06o1hk4vZ1ZRanNni4spCCXNFTFVd0/view?usp=drivesdk"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white', ml: 1 }}
              >
                <AndroidIcon />
              </IconButton>
            </Typography>
            <audio id="radio-player" controls autoPlay style={{ marginTop: '10px' }} />
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © <span>{currentYear}</span> Copyright{' '}
            <Link
              href="https://x.com/kobbygilbert1"
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ color: 'inherit', fontWeight: 'bold', px: 1 }}
            >
              Kobby24
            </Link>
            All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
