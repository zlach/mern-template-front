import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { routeChangeAction } from '../../store/commonActions'

const RouteListener = props => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(routeChangeAction())
  }, [location, dispatch])

  return props.children
}

export default RouteListener
