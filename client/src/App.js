import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Login from './pages/Login';
import './App.css'
import InputAdornments from './components/passwordBox';
import IssuePage from './Layouts/IssuePage';
import IssueForm from './pages/IssueForm';
import { fetchIssueData } from './store/issue-action'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { checkLoginthunk } from './store/login-actions';

let flag = false;

function App() {

  const dispatch = useDispatch();
  
  const login = useSelector((state) => state.loginSlice.login);
  const userdata  = useSelector((state) => state.loginSlice.user );
  // const login = true;
  console.log(login);
  console.log('app' , userdata);

  
  React.useEffect(() => {
   
      dispatch(checkLoginthunk());
    console.log('login checked');
    // if(login){
    dispatch(fetchIssueData());
    console.log('data fetched');
    // }
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path = '/'  >
          <Route index element = {login ? <IssuePage /> : <Navigate to='/login' /> } />
          <Route path = 'login' element = {!login ? <Login /> : <Navigate replace={true} to='/' />  } />

        </Route>
    </Routes>

   </>
  );
}

export default App;