import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { retrieveAuthUserAction } from '../../store/auth/authActions'

const ProtectedRoute = props => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function retrieveAuthUser() {
      try {
        await dispatch(retrieveAuthUserAction()).unwrap()
      } catch (err) {
        navigate('/login')
      }
    }
    retrieveAuthUser()
  }, [dispatch, navigate])

  return isLoggedIn ? props.children : null
}

export default ProtectedRoute
