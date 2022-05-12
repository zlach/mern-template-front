import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginAction, resendConfirmAction } from '../store/auth/authActions'
import { emailRegex } from '../utils/validation'
import { reset } from '../store/auth/authSlice'
import { AWS_AUTH_ERR } from '../utils/constants'
import { formatAuthData } from '../utils/formatting'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { authErr, isLoading } = useSelector(state => state.auth)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async data => {
    const { NOT_CONFIRMED } = AWS_AUTH_ERR
    const formatted = formatAuthData(data)
    const { username } = formatted

    try {
      await dispatch(loginAction(formatted)).unwrap()

      dispatch(reset())
      navigate('/')
    } catch (err) {
      if (err === NOT_CONFIRMED) {
        await dispatch(resendConfirmAction({ username })).unwrap()

        navigate('/confirm')
      }
    }
  }

  const navigateToSignUp = () => dispatch(reset())

  const composeErrMsg = errMsg => {
    const { NOT_CONFIRMED, NOT_AUTHORIZED, LIMIT_EXCEEDED } = AWS_AUTH_ERR

    switch (errMsg) {
      case LIMIT_EXCEEDED:
        return <div>Too many attempts. Please try again later.</div>
      case NOT_CONFIRMED:
        return (
          <div>
            Please confirm your account. <Link to="/confirm">Confirm</Link>.
          </div>
        )
      case NOT_AUTHORIZED:
        return (
          <div>
            Please make sure the email and password match. Or{' '}
            <Link onClick={navigateToSignUp} to="/signup">
              sign up
            </Link>
            .
          </div>
        )
      default:
        return <div>Sorry, something went wrong. Please try again later.</div>
    }
  }

  return (
    <div className="container">
      <h2>Log in</h2>
      <Link to={'/signup'} onClick={navigateToSignUp}>
        or Sign Up
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <input value="Submit" className="form-control btn btn-primary mt-4" disabled={isLoading} type="submit" />
      </form>
      {authErr && <span className="text-danger">{composeErrMsg(authErr)}</span>}
    </div>
  )
}

export default Login
