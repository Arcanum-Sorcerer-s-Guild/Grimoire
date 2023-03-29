import React, { useState } from "react";
import { mslContext } from "../App.js";
import "./common.css";

//Icons
import { BsSearch } from "react-icons/bs";

//React Api
import Select from "react-select";

const SearchBar = () => {
  const [inputs, setInputs] = useState({});
  const [selectedTags, setSelectedTags] = useState(null);
  const { setSearchTerms, databaseTags, user } = React.useContext(mslContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event) => {
    let tagsToAdd;
    event.preventDefault();
    if (selectedTags !== null) {
      tagsToAdd = selectedTags.map((tag) => `tags=${tag.value}`).join("&");
    } else {
      tagsToAdd = "";
    }

    if (inputs.q === "") {
      setSearchTerms({
        q: inputs.q,
        tags: tagsToAdd,
      });
    } else {
      setSearchTerms({
        inputs,
        tags: tagsToAdd,
      });
    }
  };

  const handleSearchTagChange = (value) => {
    setSelectedTags(value);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="col-span-2 mt-4 mx-10 rounded-md">
      <div className="w-full">
        <div className="rounded-md p-2">
          <Select
            value={selectedTags}
            onChange={handleSearchTagChange}
            options={databaseTags}
            isMulti="true"
            isSearchable="true"
            isClearable="true"
            placeholder="Search Tags..."
            loading={databaseTags === undefined}
            noOptionsMessage="No tags in system... You should make some!"
            className="select text-sm"
          />
        </div>
      </div>
      <div className="flex">
        <div className="grow">
          <div className="rounded-md p-2">
            <form className="flex relative">
              <input
                type="text"
                name="q"
                id="search-bar"
                className="grow rounded-md border-gray-300 text-sm"
                placeholder="Search..."
                onChange={handleChange}
                required
              />
              <BsSearch className="absolute top-3 right-3 dark:text-slate-800" />
            </form>
          </div>
        </div>
        <div className=" w-1/5 rounded-md p-2 border border-gray-300">
          <button className="text-sm px-4" onClick={() => setIsOpen(!isOpen)}>
            advanced search
          </button>
          {isOpen && (
            <form>
              <input
                type="text"
                name="title"
                id="search-bar"
                className="grow rounded-md border-gray-300 text-sm my-2"
                placeholder="Title..."
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="description"
                id="search-bar"
                className="grow rounded-md border-gray-300 text-sm my-2"
                placeholder="Description..."
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="start-date"
                id="search-bar"
                className="grow rounded-md border-gray-300 text-sm my-2"
                placeholder="Start Date..."
                onChange={handleChange}
                required
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
