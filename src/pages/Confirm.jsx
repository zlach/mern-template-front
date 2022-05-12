import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { confirmSignUpAction, resendConfirmAction } from '../store/auth/authActions'
import { formatConfirmData, formatEmail } from '../utils/formatting'
import { emailRegex } from '../utils/validation'
import { reset } from '../store/auth/authSlice'
import { AWS_AUTH_ERR } from '../utils/constants'

const Confirm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [resendEmail, setResendEmail] = useState('')
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()

  const { username, authErr, isLoading, password } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const watchEmail = watch('email')
  const watchCode = watch('code')
  const watchPassword = watch('password')

  useEffect(() => {
    if (user.isConfirmed) {
      dispatch(reset())
      navigate('/')
    }
  }, [user, navigate, dispatch])

  const handleResendCode = () => dispatch(resendConfirmAction({ username: formatEmail(resendEmail) }))

  const onSubmit = data => {
    const { code, email, pwd } = formatConfirmData(data)

    dispatch(
      confirmSignUpAction({
        username: username || email,
        code,
        id: user._id || null,
        cognitoId: user.cognitoId || null,
        password: password || pwd,
      })
    )
  }

  const composeErrMsg = errMsg => {
    const { NOT_AUTHORIZED, EXPIRED_CODE, CODE_MISMATCH } = AWS_AUTH_ERR

    switch (errMsg) {
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

  return (
    <div className="container">
      <h2>Confirm</h2>
      <h3>A confirmation code has been emailed to you.</h3>
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
        <input
          disabled={isLoading || !watchCode || (!watchEmail && !username) || (!watchPassword && !password)}
          value="Submit"
          className="form-control btn btn-primary mt-4"
          type="submit"
        />
      </form>
      <div className="my-4">-or-</div>
      <div className="form-group">
        <label>Email:</label>
        <input value={resendEmail} onChange={e => setResendEmail(e.target.value)} className="form-control" />
      </div>
      <input
        value="Resend Code"
        className="form-control btn btn-primary mt-4"
        onClick={handleResendCode}
        disabled={isLoading || !resendEmail}
        type="button"
      />
      {authErr && <span className="text-danger">{composeErrMsg(authErr)}</span>}
    </div>
  )
}

export default Confirm
