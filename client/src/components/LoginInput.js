import React from 'react'
import {Box, TextField} from '@mui/material';
import PasswordBox from './passwordBox';

import SubmitButton from './SubmitButton';
import {loginUserthunk} from '../store/login-actions';
import { useDispatch } from 'react-redux';

const LoginInput = () => {

    // const name = "Ankit Singh"

    const dispatch = useDispatch();

    const handleChange = () => {

    }

    const formSubmitHandler = (event ) => {
        event.preventDefault();
        const {password, scholarId} = event.target;
        console.log(event.target.password.value, event.target.scholarId.value);
        const username =  scholarId.value;

        const data = {
            username : username,
            password : password.value,
        }

        dispatch(loginUserthunk(data));
        

    }

  return (
    <form onSubmit={formSubmitHandler} >
    <Box  sx = {{
        margin : '10px' ,
        padding : '5px',
        
    }}>
    <TextField
        id="outlined-name"
        label="Scholar ID"
        name = 'scholarId'
        onChange={handleChange}
        type = 'number'
        fullWidth = {true}
    />
    </Box>
    <Box  sx = {{
        margin : '10px' ,
        padding : '5px',
    }}>
    <PasswordBox label='Password' name='password' sx={{
        margin : '10px',
        padding : '5px',
    }} />
    </Box>
    
        <SubmitButton title='Login' type= 'submit'></SubmitButton>
   

</form>
  )
}

export default LoginInput