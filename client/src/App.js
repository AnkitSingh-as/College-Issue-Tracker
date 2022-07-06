import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Login from './pages/Login';
import './App.css'
import InputAdornments from './components/passwordBox';
import IssuePage from './Layouts/IssuePage';

function App() {

  return (
   <>
    <Login/>
   {/* <IssuePage /> */}
   </>
  );
}

export default App;