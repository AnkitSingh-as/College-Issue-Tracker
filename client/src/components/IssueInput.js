import React from 'react'
import { Box, TextField,  TextareaAutosize } from '@mui/material';
import SelectInput from './selectInput';
// import PasswordBox from './passwordBox';
import SubmitButton from './SubmitButton';
import SimpleDialog from './Dialog';
// import { boxSizing } from '@mui/system';
import { useDispatch  , useSelector} from 'react-redux';
import { sendNewIssue } from '../store/issue-action';
// import Button from '@mui/material/Button';
// import loginSlice from '../store/login-slice';
import emailjs from '@emailjs/browser';


const IssueInput = (props) => {

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

    const lmap =new Map();

    lmap.set('HOSTEL-9', "ankitsingh_ug@ece.nits.ac.in");
    lmap.set('HOSTEL-6', "ankitsingh_ug@ece.nits.ac.in");
    lmap.set('ADMIN BUILDING', "ankitsingh_ug@ece.nits.ac.in");
    lmap.set('GYMKHANA PARK', "ankitsingh_ug@ece.nits.ac.in");
    lmap.set('NEW GALLERY', "ankitsingh_ug@ece.nits.ac.in");
    lmap.set('SPORTS COMPLEX', "ankitsingh_ug@ece.nits.ac.in");
    



    const dispatch = useDispatch();
    const user = useSelector( (state) => state.loginSlice.user );
    const issues = useSelector( ( state) => state.issue.issues);


    let key;
    let id;

    if(issues.length===0){
        key = 1;
        id = 1;
    }
    else{
        key = +issues.length + 1;
        id = key;
    }


    const formSumitHandler = (event) => {
        event.preventDefault();
        // const {scholarId, email,name, branch, password, confirmPassword } = event.target
        // console.log(scholarId.value, email.value, name.value, branch.value, password.value, confirmPassword.value);

        const { title, imgsrc,  description, location} = event.target;
        let creationDate = new Date();
        creationDate = creationDate.toDateString();
       

       
        const issue = {
            key : key,
            id : id,
            title : title.value,
            description : description.value,
            author : user[0].scholarid,
            creationDate: creationDate,
            solvedDate : null,
            status : 'Active',
            likes : [ [] , []],
            imgSrc : imgsrc.value,
            location : location.value,
            authorname : user[0].name,
        }

        // fetch("/addissue", {
        //     method : 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(issue),
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log("Success:", data);
        //     })
        //     .catch((error) => {
        //       console.log("Error:", error);
        // });
        dispatch(sendNewIssue(issue));

         var templateParams = {
            location_email : lmap.get(location.value),
            id : id,
            location : location.value,
            title : title.value,
            description : description.value,
            authorname : user[0].name,
            author : user[0].scholarid,
         }

        //  emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_PUBLIC_KEY )

        props.onClose(false);


        console.log('closed by submit click');
    }

    //     const[open, setOpen] = React.useState(false);

    // const handleOpen = () =>{
    //     setOpen(true);
    //     console.log('i have been clicked')
    // }
    // const handleClose = () => {
    //     setOpen(false);
    // }

    // <SubmitButton title='Add new Issue' onClick = {handleaddIssuebutton} />
  
    return (
        <>
        {/* <Button onClick={handleOpen}> Add new issue</Button> */}
    {/* <SubmitButton title={'ADD NEW ISSUE'} type='button'  onClick = {handleOpen}>Add new Issue</SubmitButton> */}
    <SimpleDialog title='Submit the details of the issue' open={props.open} onClose={props.onClose}>
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
            <SelectInput list={location} name='location' listTitle='location' />
        </Box>
        <SubmitButton title='SUBMIT' type='submit'></SubmitButton>

    </form>
    </SimpleDialog>
    </>
)
}

export default IssueInput