import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
      <>
      <Link to="/home"><span>Home</span></Link>
      <Link to="/login"><span>Login</span></Link>
      </>
    
  )
}
;
export default NavBar