import React, { useState, useEffect } from "react";
import { mslContext } from "../App.js";
import { Card, Button } from "flowbite-react";
import Select from "react-select";
import {useNavigate} from "react-router-dom"
import CreatableSelect from "react-select/creatable";

const PostEntry = () => {
  const [inputs, setInputs] = useState({ tags: [] });
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const { srvPort, databaseTags, templateValues,setTemplateValues,newTag,setNewTag } = React.useContext(mslContext);
  const [selectedTags, setSelectedTags] = useState(null);
  const [readyToSend, setReadyToSend] = useState(false);
  const navigate = useNavigate();
 
  const handleSelectChange = (selections) => {
    setSelectedTags(selections);
  };
  
  const handleSubmit = () => {
    let tagArray = [];
    if (Array.isArray(selectedTags)) {
      tagArray = selectedTags.map((tag) => tag.value)
    }
    setInputs({
      tags: tagArray,
      title: inputs.title,
      description: inputs.description,
    });

    if (inputs.title !== undefined && inputs.description !== undefined) {
      setReadyToSend(true);
      setNewTag(!newTag)
    } else {
      alert("Please input Title and Description before submitting!");
    }
    setTemplateValues({title:"",description:""})
  };

  useEffect(() => {
    if (readyToSend) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([inputs]),
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
      };
      console.log(requestOptions)
      fetch(`http://localhost:${srvPort}/entries`, requestOptions)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          res.json();
        })
        .then((data) => {
          console.log(data);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  }, [readyToSend]);

  const handleSearchTagChange = (value) => {
    setSelectedTags(value);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(()=>{
    setInputs({title:templateValues.title,description:templateValues.description})
  },[templateValues]) 

  return (
    <>
      <section className="col-span-2 place-items-center h-screen w-full mt-10">
        <div className="px-9">
          <React.Fragment>
            <Card>
              <h2 className="text-amber-600">New Entry</h2>
              <input
                className="text-lg border border-gray-200 p-4 rounded-md"
                placeholder="Title..."
                name="title"
                defaultValue = {templateValues ? templateValues.title : ""}
                onChange={handleChange}
              />
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-lg w-full border border-gray-200 p-4 rounded-md"
                  placeholder="Description..."
                  name="description"
                  defaultValue = {templateValues ? templateValues.description : ""}
                  onChange={handleChange}
                  rows="4"
                  cols="50"
                />
                            <div className="updateTaggedSearch">
                              <CreatableSelect
                                value={selectedTags}
                                isMulti
                                isLoading={databaseTags ? false : true}
                                options={databaseTags}
                                placeholder="Search..."
                                openOnFocus="true"
                                onChange={handleSelectChange}
                              />
                            </div>
                <Button onClick={() => handleSubmit()}>Add Entry</Button>
              </form>
            </Card>
          </React.Fragment>
        </div>
      </section>
    </>
  );
};

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
