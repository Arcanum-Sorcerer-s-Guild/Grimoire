import React, {useEffect, useState} from "react";
import { mslContext } from '../App.js';

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [inputs,setInputs] = useState({})
  const { srvPort } = React.useContext(mslContext);
  const { searchTerms,setSearchTerms } = React.useContext(mslContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerms(...[inputs])
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))  //Updates query on submit
    //  setSearchTerms(values => ({...values, [name]: value}))  //Updates query on input
  }

  useEffect(() => {
    let searchTerm = ''
    Object.entries(searchTerms).forEach(item => {
      searchTerm+=`&${item[0]}=${item[1]}`
    })

    fetch(`http://localhost:${srvPort}/entries?${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setEntries(data)
    })
  },[searchTerms])
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" name="title" onChange={handleChange}/><br/>
      <input placeholder="Description" name="desc" onChange={handleChange}/><br/>
      <input placeholder="Username" name="username" onChange={handleChange}/><br/>
      <input type="date" name="start" onChange={handleChange}/><br/>
      <input type="date" name="end" onChange={handleChange}/><br/>
    <input type="submit"/>
    </form>
    <div>
      {
      (entries.length !== 0) ?
      <div> { entries.map(entry => {
        return(<p key={Math.random()}>{`${entry.title} ${entry.created} ${entry.username} ${entry.description}`}</p>)
      } )} </div>
      :
      <div>Loading</div>
      }

    </div>
    </>
  )
}

export default Entries;