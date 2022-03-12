import { MonetizationOn } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { RootState } from 'app/store';
import { useSelector } from 'react-redux';

Header.propTypes = {};

function Header() {
  const currentUser = useSelector((state: RootState) => state.user.current);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <MonetizationOn />

          <Typography variant="h6" textAlign="center" flexGrow={1}>
            Budget Pro
          </Typography>

          <IconButton>
            <Avatar src={currentUser?.photoUrl} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
