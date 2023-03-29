import React, { useState, useEffect } from "react";
import { mslContext } from "../App.js";
import { Card, Button } from "flowbite-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const PostEntry = () => {
  const [inputs, setInputs] = useState({ tags: [] });
  const [tagsToAdd, setTagsToAdd] = useState([]);
  const { srvPort, databaseTags } = React.useContext(mslContext);
  const [selectedTags, setSelectedTags] = useState(null);
  const [readyToSend, setReadyToSend] = useState(false);
  const navigate = useNavigate();

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
    });

    if (inputs.title !== undefined && inputs.description !== undefined) {
      setReadyToSend(true);
    } else {
      alert("Please input Title and Description before submitting!");
    }
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

  return (
    <>
      <section className="col-span-2 place-items-center h-screen w-full mt-10">
        <div className="px-9">
          <React.Fragment>
            <Card>
              <h2>New Entry</h2>
              <input
                className="text-lg border border-gray-200 p-4 rounded-md"
                placeholder="Title..."
                name="title"
                onChange={handleChange}
              />
              <form onSubmit={handleSubmit}>
                <textarea
                  className="text-lg w-full border border-gray-200 p-4 rounded-md"
                  placeholder="Description..."
                  name="description"
                  onChange={handleChange}
                  rows="4"
                  cols="50"
                />
                <hr className="m-5" />
                <div>
                  <h2>Tags</h2>

                  <div className="updateTaggedSearch mt-5">
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
                  <div className="px-4">
                    <h3 className="px-4 mt-2 text-gray-600 italic">
                      Create New Tag{" "}
                      <span className="text-xs">
                        (separate tags with comas)
                      </span>
                    </h3>
                    <input
                      className="text-md w-full min-h-fit p-2 mt-5 border border-gray-200 rounded-md"
                      placeholder="New Tags..."
                      name="newTags"
                      onChange={handleChange}
                    />
                    <p className="text-gray-500 mt-2 ml-4">
                      Ex: Tag 1,Tag 2,Tag 3
                    </p>
                  </div>
                  <div className="mt-4 float-right">
                    <Button
                      className="bg-slate-900"
                      onClick={() => handleSubmit()}
                    >
                      Add Entry
                    </Button>
                  </div>
                </div>
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
