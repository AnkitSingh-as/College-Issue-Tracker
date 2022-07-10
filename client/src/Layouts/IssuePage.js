import React from 'react'
import CustomCard from '../components/CustomCard'
import {useDispatch, useSelector} from 'react-redux';
import IssueForm from '../pages/IssueForm';
import SimpleButton from '../components/SimpleButton';
import { logoutUserthunk } from '../store/login-actions';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PrimarySearchAppBar from '../components/Navbar';
import Footer from '../components/Footer';



const IssuePage = () => {

    const issues = useSelector( (state) => state.issue.issues );

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    

    const handleaddIssuebutton = ( ) => {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }

    const handleLogout = ( ) => {
        dispatch(logoutUserthunk());
    }

   

    console.log(issues);
  return (
    <div>
      <PrimarySearchAppBar handleIssueButton = {handleaddIssuebutton} handleLogout = {handleLogout} />
      <Box sx ={{flexGrow : 1 , padding: '30px'}} >
      <Grid container rowSpacing={4} columnSpacing={{ md : 12, sm : 5 , lg: 1}}
        justifyContent="center"
        alignItems="center"
      >
      { 
        issues.map( (issue) => (
          <Grid item lg={4} sx = {{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
          }} >
            <CustomCard 
            key = {issue.id.toString()}
            id = {issue.id}
            author = {issue.author}
            creationdate = {issue.creationDate}
            status = {issue.status}
            title = {issue.title}
            imgsrc = {issue.imgSrc}
            authorname = {issue.authorname}
            
          />
          </Grid> 
         ) )
      }
      </Grid>
      </Box>
      {/* <SimpleButton title='Add Issue' onClick = {handleaddIssuebutton} /> */}
      {setOpen && <IssueForm open={open} onClose={handleClose} />}
      {/* <SimpleButton title='Logout' onClick={handleLogout}></SimpleButton> */}
      <Footer/>
    </div>
  )
}

export default IssuePage