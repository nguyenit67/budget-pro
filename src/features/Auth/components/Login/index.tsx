import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';

Login.propTypes = {};

function Login(props) {
  const handleSubmit = (values) => {
    console.log('Form values', values);
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}

export default Login;
