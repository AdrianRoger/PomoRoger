import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Settings Page</h1>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default Settings;