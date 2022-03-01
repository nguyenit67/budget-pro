// DashboardFeature entry

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainBoard";
import { Box } from "@mui/material";

DashboardFeature.propTypes = {};

function DashboardFeature() {
  return (
    <Box>
      <h1>Hello, This is the DashboardFeature</h1>

      <Routes>
        <Route path="" element={<MainPage />} />
      </Routes>
    </Box>
  );
}

export default DashboardFeature;
