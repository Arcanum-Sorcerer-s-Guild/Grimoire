import React,{useEffect, useState} from 'react'
import { mslContext } from "../App.js"
import {useParams} from 'react-router-dom'


const SingleEntry = () => {
  let params = useParams()
  const { srvPort } = React.useContext(mslContext);
  const [entry, setEntry] = useState({})


  useEffect(() => {
    fetch(`http://localhost:${srvPort}/entries?id=${params.id}`)
    .then(res => res.json())
    .then(data => {
      setEntry(data.data[0])    
    })
  },[])

  return(
    <div>
    {`Created: ${entry.title} by ${entry.user} on ${entry.created}`}<br/>
    {`Updated: ${entry.updated}` }<br/>
    <p>{entry.description}</p>

    </div>
  )
}

export default SingleEntry;
