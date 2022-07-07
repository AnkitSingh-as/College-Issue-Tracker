import React from 'react'
import { Button, Box } from '@mui/material';
const SimpleButton = (props) => {
  return (
    <Box sx = {{
        margin : '10px' ,
        padding : '5px',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
    }}>
    <Button fullWidth = {true}
        onClick = {props.onClick}
        sx = {{
            color : '#fff',
            fontWeight : 'bold',
            // background : 'background: rgb(75,63,251);
            background: ' linear-gradient( 75.2deg,  rgba(41,196,255,1) -2.5%, rgba(255,158,211,1) 55%, rgba(255,182,138,1) 102.3% )',
        }}>{props.title}
    </Button>
    </Box>
  )
}

export default SimpleButton;