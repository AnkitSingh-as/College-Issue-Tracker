import { FormControl, Form, InputLabel, FormHelperText, Input, Box, TextField, Container } from '@mui/material';
import React, { useState } from 'react'
import { border, fontWeight } from '@mui/system';
import LoginInput from '../components/LoginInput';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../components/TabPanel';
import { a11yProps } from '../components/TabPanel';
import SignupInput from '../components/SignupInput';
const LoginForm = () => {

    const [value, setValue] = React.useState(0);

    const [inLogin, toggleTab] = useState(true);

    const TabhandleChange = (event, newValue) => {
        setValue(newValue);
        toggleTab(!inLogin);
    };

   
    

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                // width : 'max-content',
                // flexDirection : 'column'
                // border : '1px dotted',
                overflow : 'auto',
                padding : '30px',
                backgroundImage : 'linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% );'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: 'max-content',
                    border: '2px solid',
                    borderColor : '#00296b',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                    
                }}
            >

                
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={TabhandleChange} aria-label="basic tabs example" variant='fullWidth'

                        >
                            
                            
                            <Tab label= {inLogin ? <span style={{ color: 'white' ,fontWeight: 'bold',    
                        }}>Login</span> : "Login"} {...a11yProps(0)} 
                                    sx = {{

                                        background:
                                        inLogin === true ?
                                        'linear-gradient( 75.2deg,  rgba(41,196,255,1) -2.5%, rgba(255,158,211,1) 55%, rgba(255,182,138,1) 102.3% )' : '#fff',
                                        borderRadius : '15px 0 0 0 ',
                                        
                                    }} 
                            />
                          
                            
                            <Tab label={!inLogin ? <span style={{ color: 'white' ,fontWeight: 'bold' }}>Sign Up</span> : "Sign Up"} {...a11yProps(1)} 

                                    sx = {{

                                        background:
                                        !inLogin === true ?
                                        'linear-gradient( 75.2deg,  rgba(41,196,255,1) -2.5%, rgba(255,158,211,1) 55%, rgba(255,182,138,1) 102.3% )' : '#fff',
                                        borderRadius : ' 0 15px 0 0 ',
                                    }}

                            />
                        
                        </Tabs>
                    </Box>



                    <Box sx={{
                        borderRadius: "100px", backgroundColor: '#1a759f', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden', width: '70px', height: '70px', display: 'flex', color: '#fff', fontWeight: 'bold',
                        padding: '10px', marginTop : '20px', alignSelf: 'center'
                    }}>
                        <span>
                            <img src = 'https://miro.medium.com/max/300/1*JY-JZfN8GW_OsJoVrI7wBg.png' alt='logo'
                           width={100}
                            ></img>
                        </span>
                    </Box>
                    <Box
                        sx ={{overflowY : 'scroll hidden', 
                                }}
                    >
                    <TabPanel value={value} index={0}
                    >
                        <LoginInput></LoginInput>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SignupInput></SignupInput>
                    </TabPanel>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginForm;