import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useMatchPatterns } from 'hooks';
import { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface AuthBoxProps {
  prepend?: ReactNode;
  append?: ReactNode;
}

AuthBox.propTypes = {};

function AuthBox(props: AuthBoxProps) {
  const pathMatch = useMatchPatterns(['/login', '/register']);
  const currentTab = pathMatch?.pattern?.path;

  return (
    // container for page
    <Paper sx={{ maxWidth: 550, p: 2 }}>
      <Tabs value={currentTab} variant="fullWidth">
        <Tab label="Login" value="/login" component={NavLink} to="/login" />
        <Tab label="Sign Up" value="/register" component={NavLink} to="/register" />
      </Tabs>

      {props.prepend}

      <Outlet />

      {props.append}
    </Paper>
  );
}

export default AuthBox;
