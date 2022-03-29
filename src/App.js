import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from './components/Copyright';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tabs from './components/Tabs';
import './App.css';



function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Tabs />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="md">          
          <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4, lg: 7, xl: 10 }} justifyContent="center" alignItems="center" sx={{ marginTop: "15px"}}>
            <Link href="https://www.thingiverse.com/jsw0002/designs" target="_blank">
              <Avatar sx={{ bgcolor: "transparent", width: 24, height: 24 }} src="http://www.google.com/s2/favicons?domain=www.thingiverse.com" alt="Thingiverse Icon" />
            </Link>
            <Link href="https://cults3d.com/en/users/jsw0002/downloads" target="_blank">
              <Avatar sx={{ bgcolor: "transparent", width: 24, height: 24 }} src="http://www.google.com/s2/favicons?domain=cults3d.com" alt="Cults Icon" />
            </Link>
            <Link href="https://www.omnicalculator.com/other/3d-printing" target="_blank">
              <Avatar sx={{ bgcolor: "transparent", width: 24, height: 24 }} src="http://www.google.com/s2/favicons?domain=www.omnicalculator.com" alt="Omnicalculator Icon" />
            </Link>
            <Link href="https://flashforge-usa.com/products/flashforge-adventurer-4-3d-printer" target="_blank">
              <Avatar sx={{ bgcolor: "transparent", width: 24, height: 24 }} src="http://www.google.com/s2/favicons?domain=flashforge-usa.com" alt="FlashForge Adventurer 4 3D Printer" />
            </Link>
          </Stack>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
