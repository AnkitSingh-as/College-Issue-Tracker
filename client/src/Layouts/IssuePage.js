import React from 'react'
import CustomCard from '../components/CustomCard'
import {useDispatch, useSelector} from 'react-redux';
import SubmitButton from '../components/SubmitButton';
import IssueForm from '../pages/IssueForm';
import SimpleButton from '../components/SimpleButton';
import { logoutUserthunk } from '../store/login-actions';

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
      { 
        issues.map( (issue) => (
            <CustomCard 
            key = {issue.id}
            id = {issue.id}
            author = {issue.author}
            creationdate = {issue.creationDate}
            status = {issue.status}
            title = {issue.title}
            imgsrc = {issue.imgSrc}
            authorname = {issue.authorname}
          />
         ) )
      }
      <SimpleButton title='Add Issue' onClick = {handleaddIssuebutton} />
      {setOpen && <IssueForm open={open} onClose={handleClose} />}
      <SimpleButton title='Logout' onClick={handleLogout}></SimpleButton>
    </div>
  )
}

export default IssuePage