import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signUpAction } from '../store/auth/authActions'
import { formatSignUpData } from '../utils/formatting'
import { AWS_AUTH_ERR } from '../utils/constants'
import { emailRegex } from '../utils/validation'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const { isLoading, authErr, cognitoId } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEmpty(cognitoId)) navigate('/confirm')
  }, [cognitoId, navigate])

  const onSubmit = data => {
    const formatted = formatSignUpData(data)

    dispatch(signUpAction(formatted))
  }

  const composeErrMsg = errMsg => {
    const { USERNAME_EXISTS, INVALID_PARAMETER, INVALID_PASSWORD } = AWS_AUTH_ERR

    switch (errMsg) {
      case INVALID_PASSWORD:
        return (
          <div>
            <div>Password must:</div>
            <div>Contain at least 1 number</div>
            <div>
              {
                'Contain at least 1 special character (^ $ * . [ ] { } ( ) ? - " ! @ # % & / \\ , > < \' : ; | _ ~ ` + =)'
              }
            </div>
            <div>Contain at least 1 uppercase letter</div>
            <div>Contain at least 1 lowercase letter</div>
          </div>
        )
      case USERNAME_EXISTS:
        return (
          <div>
            Username already exists. <Link to="/login">Log in</Link>.
          </div>
        )
      case INVALID_PARAMETER:
        return <div>Email and password do not match.</div>
      default:
        return <div>Sorry, something went wrong. Please try again later.</div>
    }
  }

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <Link to="/login">or Log in</Link>
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

export default SignUp
