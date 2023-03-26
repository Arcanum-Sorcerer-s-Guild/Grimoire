import React, {useEffect, useState} from "react";
import { mslContext } from '../App.js';

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [inputs,setInputs] = useState({})
  const [tagsToAdd,setTagsToAdd] = useState([])
  const { searchTerms,setSearchTerms,databaseTags,srvPort } = React.useContext(mslContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerms(...[inputs])
    console.log(searchTerms)
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'tags' ) {
      let tempTags = [...tagsToAdd,value]
      setTagsToAdd(tempTags)
      setInputs(values => ({...values, [name]: tempTags}))
    } else {
      setInputs(values => ({...values, [name]: value}))
    }

    //  setSearchTerms(values => ({...values, [name]: value}))  //Updates query on input rather than form submit
  }

  useEffect(() => {
    let searchTerm = ''
    Object.entries(searchTerms).forEach(item => {
      if (item[0] === 'tags' && item[0].length > 1) {
        searchTerm+=`&tags=${item[1].join('&tags=')}`
      } else {
        searchTerm+=`&${item[0]}=${item[1]}`
      }

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
      <select name="tags" onChange={handleChange} defaultValue="--Tags--">
      {
        databaseTags === undefined ?
        <option>Loading...</option>
        :
        <>
        <option disabled>--Tags--</option>
        {databaseTags.map( (tag) => {
          return(<option  key={tag.id} value={tag.name}>{tag.name}</option>)})
        }</>

      }
    </select>
    <input type="submit"/>
    </form>
    <div>
      {
      (entries.length !== 0) ?
      <div> { entries.map(entry => {
        return(
          <p key={Math.random()}>
            {`Title: ${entry.title} Created: ${entry.created} Username: ${entry.username} Started: ${entry.description} Tags: `}
            {entry.tags.map(tag => <span key={Math.random()}>{` ${tag}`}</span>)}
          </p>)
      } )} </div>
      :
      <div>Loading</div>
      }

    </div>
    </>
  )
}

export default Entries;