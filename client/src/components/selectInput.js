import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



 function SelectInput(props) {
  const [currrentValue, setValue] = React.useState('');

  const optionsArray = props.list;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': {  width: '30ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div >
        <TextField
          id="outlined-select-currrentValue"
          select
          label={props.listTitle[0].toUpperCase() + props.listTitle.substring(1)}
          value={currrentValue}
          onChange={handleChange}
          helperText= {"Please select your " + props.listTitle}
          name = {props.name}
        >
          {optionsArray.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div>
    </Box>
    );
}

export default SelectInput;