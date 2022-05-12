/* eslint-disable prettier/prettier */
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Amplify } from 'aws-amplify'
import { authconfig } from './config'
import store from './store/index'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Confirm from './pages/Confirm'
import ProtectedRoute from './components/navigation/ProtectedRoute'
import UnprotectedRoute from './components/navigation/UnprotectedRoute'
import Layout from './components/navigation/Layout'
import RouteListener from './components/navigation/RouteListener'

Amplify.configure(authconfig)

function App() {
  return (
    <Provider store={store}>
      <RouteListener>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            {/* <Route index element={<Home />} /> */}
          </Route>
          <Route path="/login" element={<UnprotectedRoute><LogIn /></UnprotectedRoute>} />
          <Route path="/confirm" element={<UnprotectedRoute><Confirm /></UnprotectedRoute>} />
          <Route path="/signup" element={<UnprotectedRoute><SignUp /></UnprotectedRoute>} />
        </Routes>
      </RouteListener>
    </Provider>
  )
}

export default App
