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
      <div className="container">
        <h1 className="navbar-brand">App</h1>
        <ul className="navbar-nav">
          <li className="nav-item">
            <span className="nav-link" type="button" onClick={handleLogout}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
