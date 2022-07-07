import React from 'react'
import IssueInput from '../components/IssueInput'
import SubmitButton from '../components/SubmitButton'
const IssueForm = (props) => {

    

  return (
    <>
    <IssueInput open={props.open} onClose={props.onClose} />
     {/* <SubmitButton title='actually show issue'> </SubmitButton> */}
    </>
  )
}

export default IssueForm