import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import { flexbox } from '@mui/system';



function SimpleDialog(props) {

    // const [open, setOpen] = React.useState(true);

    const close = () => {
        props.onClose();
        console.log('closed by outer click');
    }

    return (
        <Dialog open={props.open } onClose={close} PaperProps={{
            style: { borderRadius: '10px' }   }} >
            <DialogTitle>
                <Box sx = {{display : 'flex', justifyContent : 'center', alignItems : 'center'
        }}>
                    {props.title}
                </Box>
                </DialogTitle>
            {props.children}
        </Dialog>
    );
}

export default SimpleDialog;
