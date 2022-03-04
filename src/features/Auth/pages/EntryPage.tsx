import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AuthBox from '../components/AuthBox';

interface EntryPageProps {}

EntryPage.propTypes = {};

function EntryPage(props: EntryPageProps) {
  return (
    <Box>
      <AuthBox />
    </Box>
  );
}

export default EntryPage;
