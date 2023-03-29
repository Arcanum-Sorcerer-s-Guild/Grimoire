import React, { useState } from "react";
import { mslContext } from "../App.js";
import Select from "react-select";
import "./common.css";

//Icons
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const [inputs, setInputs] = useState({});
  const [selectedTags, setSelectedTags] = useState(null);
  const { setSearchTerms, databaseTags } = React.useContext(mslContext);
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
    <div className="flex mt-4 p-2 max-w-5xl mx-auto gap-4 bg-slate-700 rounded-md">
      <div className="w-1/2">
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
      <div className="w-1/2">
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
      <div className="w-1/4">
        <div className="rounded-md p-2">
          <button
            className="text-sm p-2 px-8 relative text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            advanced search
          </button>
          {isOpen && (
            <form>
              <input
                type="text"
                name="title"
                id="search-bar"
                className="grow rounded-md border-gray-300 text-sm mb-2"
                placeholder="Title..."
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="description"
                id="search-bar"
                className="grow rounded-md border-gray-300 text-sm mb-2"
                placeholder="Description..."
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="start-date"
                id="search-bar"
                className="grow rounded-md border-gray-300 text-sm mb-2"
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
