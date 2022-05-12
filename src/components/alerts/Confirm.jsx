import React from 'react'
import { Alert, AlertTitle, Collapse } from '@mui/material';
import { AWS_AUTH_ERR } from '../../utils/constants'
import { Link } from 'react-router-dom'

const SignUpAlert = ({ err }) => {

  const composeErrMsg = errMsg => {
    const {
      NOT_AUTHORIZED, EXPIRED_CODE, CODE_MISMATCH
    } = AWS_AUTH_ERR

    switch (errMsg) {
      case CODE_MISMATCH:
        return (
          <div>Incorrect code. Please try again.</div>
        )
      case NOT_AUTHORIZED:
        return (
          <div>Sorry, something went wrong. Please make sure you have entered valid credentials. If you have already confirmed your account, proceed to <Link to="/login">log in</Link>.</div>
        )
      case EXPIRED_CODE:
        return (
          <div>Sorry, something went wrong. If you have already confirmed, proceed to <Link to="/login">log in</Link>. If not, resend code and try again.</div>
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
