import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';  // Assuming you have a Sidebar component
import AdoptPage from './components/AdoptPage';    // Assuming you have a Footer component

import Dashboard from './components/Dashboard'; // Assuming you have a Dashboard component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <Router>
    <Box sx={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
      {/* Sidebar component (fixed on the left) */}
      <Sidebar sx={{ width: 250, height: "100vh", backgroundColor: "#f4f4f4" }} />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5" }}>
        {/* Routes for the page content */}
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Default route */}
          <Route path="/adopt" element={<AdoptPage />} />
        </Routes>
      </Box>
    </Box>

    {/* Footer Component */}
    
  </Router>
  );
};


export default App;
