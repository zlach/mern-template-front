import React from 'react'

const SelectInput = ({
  register,
  options,
  label,
  name,
  classNames = '',
  required = true,
  onChange = null,
  messageLeft = null,
  messageRight = null,
  disabled = false,
}) => {
  return (
    <div className={`form-group text-input ${classNames}`}>
      <label>{label}</label>
      <select
        className="form-select"
        {...register(name, {
          required,
          onChange,
          disabled,
        })}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
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

export default SelectInput
