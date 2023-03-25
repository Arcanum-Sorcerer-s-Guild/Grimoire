import React, {useEffect, useState} from "react";
import { mslContext } from '../App.js';

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const { srvPort } = React.useContext(mslContext);

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/entries`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setEntries(data)
    })
  },[])
  return (
    <div>
      {
      (entries.length !== 0) ?
      <div> { entries.map(entry => {
        return(<div key={Math.random()}>{`${entry.title} ${entry.created} ${entry.username} ${entry.description}`}</div>)
      } )} </div>
      :
      <div>Loading</div>
      }

    </div>
  )
}

export default Entries;