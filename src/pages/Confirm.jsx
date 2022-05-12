import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { confirmSignUpAction, resendConfirmAction } from '../store/auth/authActions'
import { formatAuthData } from '../utils/formatting'
import { emailRegex } from '../utils/validation'
import { reset } from '../store/auth/authSlice'
import { AWS_AUTH_ERR } from '../utils/constants'

const Confirm = () => {
  const [showPassword, setShowPassword] = useState(false)
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
      password: '',
    },
  })

  const { username, authErr, isLoading, password } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const watchEmail = watch('email')
  const watchCode = watch('code')
  const watchPassword = watch('password')

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

  const onSubmit = async data => {
    const { code, username: email, password: pwd } = formatAuthData(data)

    try {
      await dispatch(
        confirmSignUpAction({
          username: username || email,
          code,
          id: user._id || null,
          cognitoId: user.cognitoId || null,
          password: password || pwd,
        })
      ).unwrap()

      dispatch(reset())
      navigate('/')
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

  const submitDisabled = () => isLoading || !watchCode || (!watchEmail && !username) || (!watchPassword && !password)

  const resendDisabled = () => isLoading || !resendEmail.match(emailRegex)

  return (
    <div className="container">
      <h2>Confirm</h2>
      {((username && password) || resendSuccess) && (
        <h3 className="text-success">A confirmation code has been emailed to you.</h3>
      )}
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
        {!username && (
          <div className="form-group">
            <label>Password:</label>
            <div className="input-group">
              <input
                className="form-control"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  Show
                </button>
              </div>
            </div>
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
