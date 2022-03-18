import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import ConfirmDialog from 'components/dialogs/ConfirmDialog';
import { logout } from 'features/Auth/userSlice';
import { selectTotalBalance, selectTransactions } from 'features/Transaction/selectors';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userApi from 'services/userApi';

Header.propTypes = {};

function Header() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.current);
  const [anchorElUser, setAnchorElUser] = useState<any>(null);
  const transactionList = useSelector(selectTransactions);
  const totalBalance = useSelector(selectTotalBalance);

  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  // @ts-ignore
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutConfirmOpen = () => {
    setOpenLogoutConfirm(true);
  };

  const handleLogoutConfirmOk = async () => {
    try {
      // make login request to firebase
      const action = logout();
      const actionResult = await dispatch(action);
      // @ts-ignore
      unwrapResult(actionResult);
    } catch (error: any) {
      enqueueSnackbar(`Unable to logout ${error.message}`, { variant: 'error' });
    }
  };

  const settingList = [
    currentUser?.email,
    // 'Profile',
    // 'Account',
    `Balance: $${totalBalance}`,
    `Total transactions: ${transactionList.length}`,
    'Dashboard',
    <>
      <Button onClick={handleLogoutConfirmOpen}>
        <BiLogOut />
        <Box component="span" ml={0.5}>
          Logout
        </Box>
      </Button>
      <ConfirmDialog
        open={openLogoutConfirm}
        setOpen={setOpenLogoutConfirm}
        title="Logout Confirm"
        children="Are you sure to logout?"
        onConfirm={handleLogoutConfirmOk}
      />
    </>,
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <CurrencyExchangeIcon fontSize="large" />

          <Typography variant="h3" component="h6" fontWeight="bold" textAlign="center" flexGrow={1}>
            Budget Pro
          </Typography>

          <Typography variant="body1" fontSize={18} mr={1}>
            Hi, {currentUser?.name}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={currentUser?.photoUrl} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingList.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="right"
                    display="inline-flex"
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    justifyContent="flex-end"
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
