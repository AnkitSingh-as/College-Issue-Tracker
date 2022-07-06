import React from 'react'
import { Box, TextField,  TextareaAutosize, Modal, Dialog } from '@mui/material';
import SelectInput from './selectInput';
import PasswordBox from './passwordBox';
import SubmitButton from './SubmitButton';
import SimpleDialog from './Dialog';
import { boxSizing } from '@mui/system';



const IssueInput = () => {

    const location = [
        {
            value: 'HOSTEL-9',
            label: 'HOSTEL-9',
        },
        {
            value: 'HOSTEL-6',
            label: 'HOSTEL-6',
        },
        {
            value: 'ADMIN BUILDING',
            label: 'ADMIN BUILDING',
        },
        {
            value: 'GYMKHANA PARK',
            label: 'GYMKHANA PARK',
        },
        {
            value: 'NEW GALLERY',
            label: 'NEW GALLERY',
        },
        {
            value: 'SPORTS COMPLEX',
            label: 'SPORTS COMPLEX',
        }
    ]

    const [open, setOpen] = React.useState(true);


    const formSumitHandler = (event) => {
        event.preventDefault();
        // const {scholarId, email,name, branch, password, confirmPassword } = event.target
        // console.log(scholarId.value, email.value, name.value, branch.value, password.value, confirmPassword.value);

        const { title, imgsrc,  description, location} = event.target;
        // console.log(title.value, imgsrc.value, location.value , description.value);
        const issue = {
            key : 1,
            id : 1,
            title : title.value,
            description : description.value,
            author : 1914172,
            creationDate: new Date(),
            solvedDate : null,
            status : 'Active',
            likes : null,
            imgsrc : imgsrc.value,
            location : location.value,
        }

        fetch("/addissue", {
            method : 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issue),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.log("Error:", error);
        });

        setOpen(false);
        console.log('closed by submit click');
    }

  
    return (
    <SimpleDialog title='Submit the details of the issue' open={open} close={setOpen}>
    <form onSubmit= {formSumitHandler}>
        <Box sx={{
            margin: '10px',
            padding: '5px',

        }}>
            <TextField
                id="title"
                label="Title"
                name='title'
                // onChange= ''
                type='text'
                fullWidth={true}
                sx = {{
                    width : { md : '50ch' }
                }}
            />
        </Box>
        <Box sx={{
            margin: '10px',
            padding: '5px',

        }}>
            <TextField
                id="outlined-name1"
                label="Image Source"
                name='imgsrc'
                // onChange= ''
                type='text'
                fullWidth={true}
            />
        </Box>
        <Box sx={{
            margin: '10px',
            padding: '5px',

        }}>
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    name = 'description'
                    placeholder="Briefly describe your issue"
                    style= {{ maxWidth : '100%',
                    boxSizing : 'border-box',
                    WebkitBoxSizing : 'border-box',
                    MozBoxSizing : 'bordre-box',
                    float: 'left',
                    width: '100%',
                    minHeight: '20px',
                    outline: 'none',
                    resize: 'none',
                    border: '1px solid lightgrey',
                    margin : '0 0 20px 0',
                    borderRadius : '5px'
                }}
                    
            />
        
        </Box>
        <Box sx={{
            margin: '10px',
            padding: '5px',
        }}>
            <SelectInput list={location} name='location' listTitle='branch' />
        </Box>
        <SubmitButton title='SUBMIT'></SubmitButton>

    </form>
    </SimpleDialog>
)
}

export default IssueInput