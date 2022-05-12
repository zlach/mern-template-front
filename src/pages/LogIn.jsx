import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '../store/auth/authActions'
import { emailRegex } from '../utils/validation'
import { reset } from '../store/auth/authSlice'
import { AWS_AUTH_ERR } from '../utils/constants'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { isLoggedIn, authErr, isLoading } = useSelector(state => state.auth)
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

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn, navigate])

  const navigateToSignUp = () => dispatch(reset())

  const onSubmit = data =>
    dispatch(
      loginAction({
        username: data.email,
        password: data.password,
      })
    )

  const navigateAway = () => dispatch(reset())

  const composeErrMsg = errMsg => {
    const { NOT_CONFIRMED, NOT_AUTHORIZED } = AWS_AUTH_ERR

    switch (errMsg) {
      case NOT_CONFIRMED:
        return (
          <div>
            Please confirm your account.{' '}
            <Link onClick={navigateAway} to="/confirm">
              Confirm
            </Link>
            .
          </div>
        )
      case NOT_AUTHORIZED:
        return (
          <div>
            Please make sure the email and password match. Or{' '}
            <Link onClick={navigateAway} to="/signup">
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
