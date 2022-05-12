import React from 'react'
import { Alert, AlertTitle, Collapse } from '@mui/material';
import { useDispatch } from 'react-redux'
import { AWS_AUTH_ERR } from '../../utils/constants'
import { Link } from 'react-router-dom'
import { reset } from '../../store/auth/authSlice'


const LogInAlert = ({ err }) => {
  const dispatch = useDispatch()

  const navigateAway = () => dispatch(reset())

  const composeErrMsg = errMsg => {
    const {
      NOT_CONFIRMED, NOT_AUTHORIZED
    } = AWS_AUTH_ERR

    switch (errMsg) {
      case NOT_CONFIRMED:
        return (
          <div>Please confirm your account. <Link onClick={navigateAway} to="/confirm">Confirm</Link>.</div>
        )
      case NOT_AUTHORIZED:
        return (
          <div>Please make sure the email and password match. Or <Link onClick={navigateAway} to="/signup">sign up</Link></div> // TODO: test
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

export default LogInAlert;
