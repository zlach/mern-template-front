import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import { retrieveAuthUserAction } from '../../store/auth/authActions'
import { getProfileAction } from '../../store/profile/profileActions'

const ProtectedRoute = props => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const { profile, profileErr } = useSelector(state => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function retrieveAuthUser() {
      try {
        const { cognitoId } = await dispatch(retrieveAuthUserAction()).unwrap()

        if (isEmpty(profile)) {
          await dispatch(getProfileAction({ id: cognitoId })).unwrap()
        }
      } catch (err) {
        // The 404 refers to the profileErr
        if (err === 404) {
          navigate('/onboarding')
        } else {
          navigate('/login') // TODO: should have an error page that can go to if getProfileAction fails, e.g. token problem leads to 403
        }
      }
    }
    retrieveAuthUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate])

  return isLoggedIn && !isEmpty(profile) ? props.children : null
}

export default ProtectedRoute
