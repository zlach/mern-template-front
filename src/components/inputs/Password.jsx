import React, { useState } from 'react'

const PasswordInput = ({
  register,
  label,
  name,
  required = true,
  maxLength = null,
  minLength = null,
  onChange = null,
  validate = null,
  messageLeft = null,
  messageRight = null,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="form-group password-input">
      <label>{label}</label>
      <div className="input-group">
        <input
          className="form-control"
          type={showPassword ? 'text' : 'password'}
          {...register(name, {
            required,
            maxLength,
            minLength,
            onChange,
            validate,
            disabled,
          })}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
          </button>
        </div>
      </div>
      {(messageLeft || messageRight) && (
        <div
          className={`d-flex ${
            messageLeft && messageRight
              ? ' justify-content-between'
              : messageRight && !messageLeft
              ? ' justify-content-end'
              : ' justify-content-start'
          }`}
        >
          {messageLeft}
          {messageRight}
        </div>
      )}
    </div>
  )
}

export default PasswordInput
