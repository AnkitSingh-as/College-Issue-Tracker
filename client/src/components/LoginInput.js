import React from 'react'
import { FormControl, InputLabel, FormHelperText, Input, Box, TextField, Button, Container} from '@mui/material';
import PasswordBox from './passwordBox';
import { padding } from '@mui/system';
import SubmitButton from './SubmitButton';

const LoginInput = () => {

    // const name = "Ankit Singh"


    const handleChange = () => {

    }

    const formSubmitHandler = (event ) => {
        event.preventDefault();
        console.log(event.target.loginPassword.value, event.target.scholarId.value);
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
    
        <SubmitButton title='Login'></SubmitButton>
   

</form>
  )
}

export default LoginInput