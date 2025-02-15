import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  const handleToggle = () => {
    setDarkMode(prev => !prev);
    // Optionally update a global context or Redux store
  };

  return (
    <FormControlLabel
      control={<Switch checked={darkMode} onChange={handleToggle} />}
      label="Dark Mode"
    />
  );
};

export default DarkModeToggle;