import React from "react";
import {Box} from '@mui/material'


const OptionsItem = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {props.icon}
      <Box sx={{ marginLeft: "10px" }}> {props.text} </Box>{" "}
    </Box>
  );
};

export default OptionsItem;
