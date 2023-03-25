import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
      <>
      <Link to="/home"><div>Home</div></Link>
      <Link to="/login"><div>Login</div></Link>
      <Link to="/post"><div>Add Entry</div></Link>
      </>

  )
}
;
export default NavBar

