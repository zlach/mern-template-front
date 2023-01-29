import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getProfileAction } from '../store/profile/profileActions'
import isAlpha from 'validator/es/lib/isAlpha'
import isEmpty from 'lodash/isEmpty'

import { retrieveAuthUserAction } from '../store/auth/authActions'
import TextInput from '../components/inputs/Text'
import { createProfileAction } from '../store/profile/profileActions'

const Onboarding = () => {
  const [isReady, setIsReady] = useState(false)
  const [authUser, setAuthUser] = useState({})

  const { isLoggedIn } = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    async function retrieveAuthUser() {
      if (!isEmpty(profile)) {
        navigate('/')
      }

      let res

      try {
        res = await dispatch(retrieveAuthUserAction()).unwrap()

        setAuthUser(res)
      } catch (err) {
        navigate('/login')
      }

      try {
        await dispatch(getProfileAction({ id: res.cognitoId })).unwrap()
      } catch (err) {
        setIsReady(true)
      }
    }
    retrieveAuthUser()
  }, [dispatch, navigate, profile])

  const onSubmit = async value =>
    dispatch(
      createProfileAction({
        cognitoId: authUser.cognitoId,
        name: value.name,
        email: authUser.email,
        isConfirmed: true,
      })
    )

  const getNameFeedback = () => {
    if (errors && errors.name && errors.name.type === 'validate') {
      return <small className="text-danger">Sorry, you entered a character that is not allowed</small>
    } else if (errors && errors.name && errors.name.type === 'maxLength') {
      return <small className="text-danger">Name must be no more than 50 characters</small>
    }
  }

  return (
    isLoggedIn &&
    isReady && (
      <div className="container onboarding-page d-flex flex-column align-items-center text-center">
        <h2>Wickshelf Admin Portal</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-50">
          <TextInput
            register={register}
            label={<div className="mb-2">Name</div>}
            name="name"
            maxLength={50}
            required={false}
            validate={v => isAlpha(v, 'en-US', { ignore: ' -()' }) || isEmpty(v, { ignore_whitespace: true })}
            messageLeft={getNameFeedback()}
          />
          <input
            disabled={!isValid}
            value="Create Profile"
            className="form-control btn custom-submit mt-4"
            type="submit"
          />
        </form>
      </div>
    )
  )
}

export default Onboarding
