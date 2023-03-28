import React, { useState } from "react";
import { mslContext } from "../App.js";
import Select from "react-tailwindcss-select";
import { FaSearchengin } from "react-icons/fa";

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
    console.log(selectedTags);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="col-span-2 w-full text-2xl p-7">
      {!user.username ? (
        <div className="text-sm mt-4">Log In</div>
      ) : (
        <div className="text-sm mt-4">
          Currently logged in as:
          <span className="ml-1 font-semibold">{user.username}</span>
        </div>
      )}
      <form className="flex items-center mt-5" onSubmit={handleSubmit}>
        <label htmlFor="search-bar" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex">
            {/* BASIC SEARCH */}
            <input
              type="text"
              name="q"
              id="search-bar"
              className="text-sm rounded-md block w-full pl-3 
              bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Search..."
              onChange={handleChange}
              required
            />
            <div className="absolute top-2 right-4 text-sm rounded-md">
              {React.createElement(FaSearchengin, { size: "20" })}
            </div>
          </div>
          <div className="mt-2">
            {/* TAGGED SEARCH */}
            <Select
              value={selectedTags}
              onChange={handleSearchTagChange}
              options={databaseTags}
              isMultiple="true"
              isSearchable="true"
              isClearable="true"
              placeholder="Search Tags..."
              loading={databaseTags === undefined}
              noOptionsMessage="No tags in system... You should make some!"
            />
          </div>
        </div>
      </form>
      <div className="relative text-right">
        <button className="text-xs" onClick={() => setIsOpen(!isOpen)}>
          advanced search
        </button>
        {isOpen && (
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                id="advSearch-item"
                className="text-sm rounded-md block pl-3 
              bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Search..."
                onChange={handleChange}
                required
              />
              <input type="text" name="description" placeholder="description" />
              <input type="text" name="start date" placeholder="start date" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
