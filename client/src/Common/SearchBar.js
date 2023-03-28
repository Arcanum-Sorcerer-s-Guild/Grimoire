import React, { useState } from "react";
import { mslContext } from "../App.js";
import Select from "react-tailwindcss-select";
import { FaSearchengin } from "react-icons/fa";

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
    setSearchTerms({
      q: inputs.q,
      tags: tagsToAdd,
    });
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
    <div className="col-span-2 w-full font-semibold text-2xl p-7">
      <form className="flex items-center mt-10" onSubmit={handleSubmit}>
        <label for="search-bar" className="sr-only">
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
              {React.createElement(FaSearchengin , { size: "20" })}
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
        <button
          className="text-xs"
          onClick={() => setIsOpen(!isOpen)}
        >
          advanced search
        </button>
        {isOpen && (
          <div className="flex justify-center">
            title
            description
            start date
            end date
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
