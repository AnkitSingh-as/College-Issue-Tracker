import { Box } from '@mui/material'
import React from 'react'

const Footer = () => {
    let year = new Date().getFullYear();
  return (
    <div>
        <Box sx= {{display : 'flex' , alignItems : 'center' , justifyContent: 'center', background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)', minHeight : '50px', color: 'white', fontWeight :'bold'}}>
            Ankit Singh &copy; {year}
        </Box>
    </div>
  )
}

export default Footer