import React from 'react'

const TextInput = ({
  register,
  label,
  name,
  classNames = '',
  required = true,
  maxLength = null,
  minLength = null,
  onChange = null,
  validate = null,
  messageLeft = null,
  messageRight = null,
  disabled = false,
}) => {
  return (
    <div className={`form-group text-input ${classNames}`}>
      <label>{label}</label>
      <input
        className="form-control"
        type="text"
        {...register(name, {
          required,
          maxLength,
          minLength,
          onChange,
          validate,
          disabled,
        })}
      />
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

export default TextInput
