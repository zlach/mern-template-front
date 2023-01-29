import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Hub } from 'aws-amplify'
import { confirmSignUpAction, resendConfirmAction } from '../store/auth/authActions'
import { formatAuthData } from '../utils/formatting'
import { emailRegex } from '../utils/validation'
import { reset } from '../store/auth/authSlice'
import { AWS_AUTH_ERR } from '../utils/constants'

const Confirm = () => {
  const [awaitingSignIn, setAwaitingSignIn] = useState(false)
  const [resendEmail, setResendEmail] = useState('')
  const [displayResend, setDisplayResend] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      code: '',
    },
  })

  const { username, authErr, isLoading } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const watchEmail = watch('email')
  const watchCode = watch('code')

  const handleResendCode = async e => {
    e.preventDefault()
    try {
      await dispatch(resendConfirmAction(formatAuthData({ email: resendEmail }))).unwrap()
      setResendEmail('')
      setDisplayResend(false)
      setResendSuccess(true)
    } catch (err) {
      // Do nothing
    }
  }

  const listenToAutoSignInEvent = () => {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload
      if (event === 'autoSignIn') {
        // const user = payload.data
        dispatch(reset())
        navigate('/onboarding')
      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
        navigate('/login')
      }
    })
  }

  const onSubmit = async data => {
    const { code, username: email } = formatAuthData(data)

    try {
      listenToAutoSignInEvent()
      setAwaitingSignIn(true)

      await dispatch(
        confirmSignUpAction({
          username: username || email,
          code,
        })
      ).unwrap()
    } catch (err) {
      // Do nothing
    }
  }

  const composeErrMsg = errMsg => {
    const { NOT_AUTHORIZED, EXPIRED_CODE, CODE_MISMATCH, LIMIT_EXCEEDED } = AWS_AUTH_ERR

    switch (errMsg) {
      case LIMIT_EXCEEDED:
        return <div>Too many attempts. Please try again later.</div>
      case CODE_MISMATCH:
        return <div>Incorrect code. Please try again.</div>
      case NOT_AUTHORIZED:
        return (
          <div>
            Sorry, something went wrong. Please make sure you have entered valid credentials. If you have already
            confirmed your account, proceed to <Link to="/login">log in</Link>.
          </div>
        )
      case EXPIRED_CODE:
        return (
          <div>
            Sorry, something went wrong. If you have already confirmed, proceed to <Link to="/login">log in</Link>. If
            not, resend code and try again.
          </div>
        )
      default:
        return <div>Sorry, something went wrong. Please try again later.</div>
    }
  }

  const submitDisabled = () => isLoading || !watchCode || (!watchEmail && !username)

  const resendDisabled = () => isLoading || !resendEmail.match(emailRegex)

  return awaitingSignIn ? (
    <div class="spinner-border" role="status">
      {/* TODO: we need an official loader that will incorporate our logo */}
    </div>
  ) : (
    <div className="container">
      <h2>Confirm</h2>
      {username && resendSuccess && <h3 className="text-success">A confirmation code has been emailed to you.</h3>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {!username && (
          <div className="form-group">
            <label>Email:</label>
            <input
              className="form-control"
              {...register('email', {
                required: true,
                pattern: { value: emailRegex, message: 'Please enter a valid email address' },
              })}
            />
            {errors && errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>
        )}
        <div className="form-group">
          <label>Code:</label>
          <input
            className="form-control"
            {...register('code', {
              required: true,
            })}
          />
          {errors && errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <input disabled={submitDisabled()} value="Submit" className="form-control btn btn-primary mt-4" type="submit" />
      </form>
      <div className="py-4">
        <div className="d-inline align-baseline">-or-</div>
        <button
          type="button"
          className="btn btn-link d-inline align-baseline"
          onClick={() => setDisplayResend(!displayResend)}
        >
          Resend Confirmation Code
        </button>
      </div>
      {displayResend && (
        <form onSubmit={handleResendCode}>
          <div className="form-group">
            <label>Email:</label>
            <input
              autoFocus
              value={resendEmail}
              onChange={e => setResendEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <button className="form-control btn btn-primary mt-4" disabled={resendDisabled()} type="submit">
            Resend Code
          </button>
        </form>
      )}
      {authErr && <span className="text-danger">{composeErrMsg(authErr)}</span>}
    </div>
  )
}

export default Confirm
