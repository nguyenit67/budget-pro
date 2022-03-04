import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useMatchPatterns } from 'hooks';
import { NavLink, Outlet } from 'react-router-dom';

interface AuthBoxProps {}

AuthBox.propTypes = {};

function AuthBox(props: AuthBoxProps) {
  const pathMatch = useMatchPatterns(['/login', '/register']);
  const currentTab = pathMatch?.pattern?.path;

  return (
    // container for page
    <Container sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
      <Box sx={{ maxWidth: 600, p: 2 }}>
        <Typography variant="h3">Budget Pro</Typography>
      </Box>

      <Paper sx={{ maxWidth: 550, p: 2 }}>
        <Tabs value={currentTab} variant="fullWidth">
          <Tab label="Login" value="/login" component={NavLink} to="/login" />
          <Tab label="Sign Up" value="/register" component={NavLink} to="/register" />
        </Tabs>

        <Outlet />
      </Paper>
    </Container>
  );
}

export default AuthBox;
