import React from 'react'
import { Box, TextField } from '@mui/material'

import SelectInput from './selectInput'
import PasswordBox from './passwordBox'
import SubmitButton from './SubmitButton';
import { useDispatch } from 'react-redux';
import { registerUserthunk } from '../store/login-actions';

const branches = [
    {
        value: 'CSE',
        label: 'CSE',
    },
    {
        value: 'ECE',
        label: 'ECE',
    },
    {
        value: 'EE',
        label: 'EE',
    },
    {
        value: 'ME',
        label: 'ME',
    },
    {
        value: 'EIE',
        label: 'EIE',
    },
    {
        value: 'CE',
        label: 'CE',
    }
];





const SignupInput = () => {

    const dispatch = useDispatch();

    const formSumitHandler  = ( event) => {
            event.preventDefault();
            const {scholarId, email,name, branch, password, confirmPassword } = event.target

            const data = {
                username : scholarId.value,
                scholarid : scholarId.value,
                name :  name.value,
                email : email.value,
                branch : branch.value,
                password : password.value,
            }
            console.log(scholarId.value, email.value, name.value, branch.value, password.value, confirmPassword.value);
            
            dispatch(registerUserthunk(data));
    }

    return (
        <form onSubmit= {formSumitHandler}>
            <Box sx={{
                margin: '10px',
                padding: '5px',

            }}>
                <TextField
                    id="outlined-name"
                    label="Scholar ID"
                    name='scholarId'
                    // onChange= ''
                    type='number'
                    fullWidth={true}

                />
            </Box>
            <Box sx={{
                margin: '10px',
                padding: '5px',

            }}>
                <TextField
                    id="outlined-name1"
                    label="Institute Email"
                    name='email'
                    // onChange= ''
                    type='text'
                    fullWidth={true}
                />
            </Box>
            <Box sx={{
                margin: '10px',
                padding: '5px',

            }}>
                <TextField
                    id="outlined-name2"
                    label="Full Name"
                    name='name'
                    // onChange= ''
                    type='text'
                    fullWidth={true}
                />
            </Box>
            <Box sx={{
                margin: '10px',
                padding: '5px',
            }}>
                <SelectInput list={branches} name='branch' listTitle='branch' />
            </Box>
            <Box sx={{
                margin: '10px',
                padding: '5px',
            }}>
                <PasswordBox label='Password' name ='password'
                    sx={{
                        margin: '10px',
                        padding: '5px',
                    }} />
            </Box>
            <Box sx={{
                margin: '10px',
                padding: '5px',
            }}>
                <PasswordBox label='Confirm Password' name='confirmPassword' sx={{
                    margin: '10px',
                    padding: '5px',
                }} />
            </Box>

            <SubmitButton title='Sign Up' type='submit'></SubmitButton>

        </form>
    )
}

export default SignupInput;