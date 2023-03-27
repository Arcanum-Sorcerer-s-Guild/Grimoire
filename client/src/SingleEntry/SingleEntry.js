import React,{useEffect} from 'react'
import { mslContext } from "../App.js"
import {useParams} from 'react-router-dom'


const SingleEntry = () => {
  let params = useParams()
  const { srvPort } = React.useContext(mslContext);


  useEffect(
    fetch(`http://localhost:${srvPort}/entries?id=${params.id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    ,[])

  return(
    <div>
      Hey!
    </div>
  )
}

export default SingleEntry;