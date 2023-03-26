import React, {useState} from 'react'
import { mslContext } from '../App.js';

const PostEntry = () => {
  const [inputs,setInputs] = useState({})
  const [tagsToAdd,setTagsToAdd] = useState([])
  const { srvPort,databaseTags } = React.useContext(mslContext);


  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
  };
  fetch(`http://localhost:${srvPort}/entries`, requestOptions)
    .then(response => response.json())
    .then(data => {
      //TODO get/handle appropriate returning value from server
      // console.log(data)
    });
  }

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
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
    <input placeholder="title" name="title" onChange={handleChange}/><br/>
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
    </select><br/>

    <textarea placeholder="description" name="description" onChange={handleChange} rows="4" cols="50"/><br/>
    <button>Submit</button>
    </form>
    </>
  )
}

export default PostEntry;


//


// <option value="choose" disabled selected="selected">
//    -- Select country --
// </option>
// {this.getCountry()}


// POST ENTRY TEMPLATE
// {
//   user_id : user_id
//   title : title
//   desc : desc
//   tags : [tags]
// }


//return( <option value={tag.name}>{tag.name}</option>)