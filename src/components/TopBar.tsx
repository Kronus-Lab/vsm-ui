import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from './Logo';
import { AppUserContext } from '../context/AppUser';
import { useContext } from 'react';
import "./TopBar.css";

export default function TopBar() {
  

  const user = useContext(AppUserContext)

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Logo />
            <Typography id="title" variant="h6" component="div" className="title">
              VPN Server Manager
            </Typography>
            {user.isReady ?
              <>
                <p className="username">{user?.user?.username}</p>
                <Button color="inherit" href="/auth/logout">Logout</Button>
              </> : 
              <>
                <Button color="inherit" href="/auth/login">Login</Button>
              </>
            }
          </Toolbar>
        </AppBar>
      </Box>
  );
}