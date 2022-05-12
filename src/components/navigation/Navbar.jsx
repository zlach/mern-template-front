import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutAction } from '../../store/auth/authActions'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction()).unwrap()
      navigate('/login', { replace: true })
    } catch (err) {
      // do nothing
    }
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <h1 className="navbar-brand">App</h1>
      <button className="nav-link" type="button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar
