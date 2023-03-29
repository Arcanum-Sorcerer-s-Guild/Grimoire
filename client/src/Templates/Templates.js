import Select from "react-select";
import React, { useState } from "react";
import { mslContext } from "../App.js";
import CreatableSelect from 'react-select/creatable';


const Templates = () => {
  const { databaseTags } = React.useContext(mslContext);
  const [selectedTags, setSelectedTags] = useState(null);

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    console.log('hey!')
  }

  return(<div>

    <form onSubmit={handleSubmit}>

    <CreatableSelect 
      isMulti
      isLoading={databaseTags ? false : true}
      options={databaseTags}
      placeholder='Search...'
      openOnFocus='true' s
      hideSelectedValues='true'
      isClearable='true'
      escapeClearsValue='true'
    />
    <button type="submit">submit</button>
    </form>

    


  </div>)
}

export default Templates