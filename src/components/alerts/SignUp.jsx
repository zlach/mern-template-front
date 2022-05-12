import React from 'react'
import { Alert, AlertTitle, Collapse } from '@mui/material';
import { AWS_AUTH_ERR } from '../../utils/constants'
import { Link } from 'react-router-dom'

const SignUpAlert = ({ err }) => {

  const composeErrMsg = errMsg => {
    const {
      USERNAME_EXISTS, INVALID_PARAMETER, INVALID_PASSWORD
    } = AWS_AUTH_ERR

    switch (errMsg) {
      case INVALID_PASSWORD:
        return (
          <div>
            <div>Password rules:</div>
            <div>Contains at least 1 number</div>
            <div>{'Contains at least 1 special character (^ $ * . [ ] { } ( ) ? - " ! @ # % & / \\ , > < \' : ; | _ ~ ` + =)'}</div>
            <div>Contains at least 1 uppercase letter</div>
            <div>Contains at least 1 lowercase letter</div>
          </div>
        )
      case USERNAME_EXISTS:
        return (
          <div>Username already exists. <Link to="/login">Log in</Link>.</div>
        )
      case INVALID_PARAMETER:
        return (
          <div>Please check to make sure you are using a valid email address.</div>
        )
      default:
        return <div>Sorry, something went wrong. Please try again later.</div>
    }
  }

  return (
    <Collapse in={!!err} sx={{ width: 1, mt: 1 }}>
      <Alert severity="info">
        <AlertTitle>Hey there bud...</AlertTitle>
        {composeErrMsg(err)}
      </Alert>
    </Collapse>
  );
}

export default SignUpAlert;
