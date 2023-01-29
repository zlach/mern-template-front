import React from 'react'
import { useForm } from 'react-hook-form'

const RadioForm = ({
  fields,
  onSubmit,
  name,
  defaultValues = {
    [name]: '',
  },
  isDisabled = false,
  onChange = null,
  renderLeft = null,
  renderRight = null,
  validateMessage = '',
  successMessage = '',
  errorMessage = '',
  classNames = '',
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const watchValue = watch(name)

  return (
    <form className={`radio-form ${classNames}`} onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex justify-content-center flex-wrap">
        {fields.map((field, i) => (
          <div key={i} className="form-check">
            <label className="form-check-label" htmlFor={i}>
              {field.label}
            </label>
            <input
              className="form-check-input mt-3"
              type="radio"
              id={i}
              {...register(name, {
                required: true,
                onChange,
              })}
              value={field.value}
            />
          </div>
        ))}
      </div>
      {(renderLeft || renderRight) && (
        <div
          className={`d-flex ${
            renderLeft && renderRight
              ? ' justify-content-between'
              : renderRight && !renderLeft
              ? ' justify-content-end'
              : ' justify-content-start'
          }`}
        >
          {renderLeft && renderLeft(watchValue)}
          {renderRight && renderRight(watchValue)}
        </div>
      )}
      <input
        disabled={!isValid || isDisabled || watchValue === defaultValues[name]}
        value="Submit"
        className="form-control btn custom-submit mt-4 mb-2"
        type="submit"
      />
      {errors && errors[name] && errors[name].type === 'validate' && (
        <span className="text-danger">{validateMessage}</span>
      )}
      {successMessage && (
        <div className="text-success">
          <i className="bi bi-check-circle"></i> {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="text-danger">
          <i className="bi bi-exclamation-circle"></i> {errorMessage}
        </div>
      )}
    </form>
  )
}

export default RadioForm
