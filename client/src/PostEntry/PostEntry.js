import React, { useState, useEffect } from "react";
import { mslContext } from "../App.js";
import { Card, Button } from "flowbite-react";
import Select from "react-select";

const PostEntry = () => {
  const [inputs, setInputs] = useState({ tags: [] });
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const { srvPort, databaseTags } = React.useContext(mslContext);
  const [selectedTags, setSelectedTags] = useState(null);
  const [readyToSend,setReadyToSend] = useState(false)

  const handleSubmit = () => {
    let tagArray = inputs.tags;
    if ("newTags" in inputs) {
      if (inputs.newTags.includes(",")) {
        tagArray = inputs.newTags.split(",");
      } else {
        tagArray = [inputs.newTags];
      }
    }

    if (selectedTags !== null) {
      if (selectedTags.length > 1) {
        selectedTags.map((tag) => tagArray.push(tag.value));
      } else if (selectedTags.length !== 0) {
        tagArray.push(selectedTags[0].value);
      }
    }

    if (Array.isArray(tagArray)) {
      tagArray = [...new Set(tagArray)];
      tagArray.filter((tag) => tag !== "");
    }

    setInputs({
      tags: tagArray,
      title: inputs.title,
      description: inputs.description,
      //TODO REMOVE THIS HARDCODE
      user_id: 13,
    });

    if (inputs.title !== undefined && inputs.description !== undefined) {
      setReadyToSend(true)
    } else {
      alert("Please input Title and Description before submitting!");
    }
  };

  useEffect(()=> {     
    if(readyToSend) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([inputs]),
      };
      fetch(`http://localhost:${srvPort}/entries`, requestOptions)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
      
      },[readyToSend])
      

  const handleSearchTagChange = (value) => {
    setSelectedTags(value);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <section className="col-span-2 place-items-center h-screen w-full">
        <div className="px-9">
          <React.Fragment>
            <Card>
              Title:{" "}
              <input
                className="text-black"
                placeholder="title"
                name="title"
                onChange={handleChange}
              />
              <form onSubmit={handleSubmit}>
                Description:
                <br />
                <textarea
                  className="text-black"
                  placeholder="description"
                  name="description"
                  onChange={handleChange}
                  rows="4"
                  cols="50"
                />
                <br />
                New Tags: (Seperate with commas)
                <br />
                <input
                  // classname="w-max"
                  className="text-black"
                  placeholder="Ex: Tag 1,Tag 2,Tag 3"
                  name="newTags"
                  onChange={handleChange}
                />
                <br />
                Existing Tags:
                <div className="updateTaggedSearch">
                  <Select
                    value={selectedTags}
                    onChange={handleSearchTagChange}
                    options={databaseTags}
                    isMulti="true"
                    isSearchable="true"
                    isClearable="true"
                    placeholder="Add Tags..."
                    loading={databaseTags === undefined}
                    noOptionsMessage="No tags in system... You should make some!"
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
