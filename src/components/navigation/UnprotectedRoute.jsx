import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { retrieveAuthUserAction } from '../../store/auth/authActions'

const UnprotectedRoute = props => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function retrieveAuthUser() {
      try {
        await dispatch(retrieveAuthUserAction()).unwrap()
        navigate('/', { replace: true })
      } catch (error) {
        // do nothing
      }
    }
    retrieveAuthUser()
  }, [dispatch, navigate])

  return props.children
}

export default UnprotectedRoute
