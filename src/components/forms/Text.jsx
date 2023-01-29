import React from 'react'
import { useForm } from 'react-hook-form'

const TextForm = ({
  onSubmit,
  label,
  name,
  showLabel = true,
  minLength = null,
  maxLength = null,
  required = true,
  defaultValues = { [name]: '' },
  isDisabled = false,
  onChange = null,
  validate = null,
  renderLeft = null,
  renderRight = null,
  validateMessage = '',
  successMessage = '',
  displayTextarea = false,
  errorMessage = '',
  submitText = 'Submit',
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
    <form className="text-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        {showLabel && <label>{label}</label>}
        {displayTextarea ? (
          <textarea
            className="form-control custom-textarea mt-3"
            rows={4}
            {...register(name, {
              required,
              maxLength,
              minLength,
              onChange,
              validate,
            })}
          />
        ) : (
          <input
            className="form-control mt-3"
            {...register(name, {
              required,
              maxLength,
              minLength,
              onChange,
              validate,
            })}
          />
        )}
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
        value={submitText}
        className="form-control btn custom-submit mt-4 mb-2"
        type="submit"
      />
      {errors && errors[name] && errors[name].type === 'validate' && (
        <span className="text-danger">{validateMessage}</span>
      )}
      {errors && errors[name] && errors[name].type === 'maxLength' && (
        <span className="text-danger">
          {label} must be no more than {maxLength} characters
        </span>
      )}
      {errors && errors[name] && errors[name].type === 'minLength' && (
        <span className="text-danger">
          {label} must be at least {minLength} characters
        </span>
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

export default TextForm
