import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Link, Paper } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

interface EntryPageProps {}

AuthBox.propTypes = {};

function AuthBox(props: EntryPageProps) {
  return (
    // container for page
    <Container sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
      <Paper sx={{ maxWidth: 600, p: 2 }}>
        <Box
          component="ul"
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-around',

            p: 0,
            // width: '100%',
            listStyleType: 'none',
          }}
        >
          <li>
            <Link component={NavLink} to="/login" end>
              Login
            </Link>
          </li>

          <li>
            <Link component={NavLink} to="/register" end>
              Sign Up
            </Link>
          </li>
        </Box>

        <Outlet />
      </Paper>
    </Container>
  );
}

export default AuthBox;
