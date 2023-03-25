import React, {useState} from 'react'

const PostEntry = () => {
  const [inputs,setInputs] = useState({})

  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
  };
  fetch('http://localhost:3001/entries', requestOptions)
    .then(response => response.json())
    .then(data => {
      //TODO get/handle appropriate returning value from server
      console.log(data)
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
    <input placeholder="title" name="title" onChange={handleChange}/>
    <input placeholder="description" name="description" onChange={handleChange}/>
    <button>Submit</button>
    </form>
    </>
  )
}

export default PostEntry;

// POST ENTRY TEMPLATE
// {
//   user_id : user_id
//   title : title
//   desc : desc
//   tags : [tags]
// }
