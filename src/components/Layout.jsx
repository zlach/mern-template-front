import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navigation/Navbar'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
