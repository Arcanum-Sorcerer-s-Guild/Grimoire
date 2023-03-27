import React, {useState} from 'react'
import { mslContext } from '../App.js';


const Login = () => {

  const [inputs,setInputs] = useState({})

  const handleSubmit = () => {
    console.log(`User ${inputs.username} logged in}`)
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
    <input placeholder="Username" name="username" onChange={handleChange}/>
    </form>
    </>
  )

  
}
export default Login;