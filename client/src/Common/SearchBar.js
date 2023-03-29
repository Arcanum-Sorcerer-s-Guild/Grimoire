import React, { useState } from "react";
import { mslContext } from "../App.js";
import "./common.css";

//Icons
import { BsSearch } from "react-icons/bs";

//React Api
import Select from "react-select";

const SearchBar = () => {
  const [inputs, setInputs] = useState({});
  const [advancedInputs, setAdvancedInputs] = useState({});
  const [selectedTags, setSelectedTags] = useState(null);
  const { searchTerms, setSearchTerms, databaseTags, user, setHighWords } =
    React.useContext(mslContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event) => {
    let tagsToAdd = "";
    event.preventDefault();
    if (selectedTags !== null) {
      tagsToAdd = selectedTags.map((tag) => `tags=${tag.value}`).join("&");
    }

      setSearchTerms({
          q: `%${inputs.q.split(' ').join('%')}%`,
          tags: tagsToAdd,
        });
      };
    
    
    
  const resetSearchTerms = (value) => {
      setInputs()
      setSearchTerms({})
      setHighWords()
      alert('Search terms reset!')
    }
    

    
    const handleAdvancedSubmit = (event) => {
      let tagsToAdd = "";
    event.preventDefault();

    if (selectedTags !== null) {
      tagsToAdd = selectedTags.map((tag) => `tags=${tag.value}`).join("&");
    }
    setSearchTerms({ ...advancedInputs, tags: tagsToAdd });
  };

  const handleSearchTagChange = (value) => {
    setSelectedTags(value);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleAdvancedChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAdvancedInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <div className="col-span-2 w-full text-2xl p-7">
        {!user.username ? (
          <div className="text-sm mt-4">Not Logged In</div>
        ) : (
          <div className="text-sm mt-4">
            Currently logged in as:
            <span className="ml-1 font-semibold">{user.username}</span>
          </div>
        )}
        <hr className="my-2" />
        {!isOpen && (
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
              bg-gray-50 border border-gray-300 text-gray-900"
                  placeholder="Search..."
                  onChange={handleChange}
                />
                <div className="absolute top-3 right-4 text-sm rounded-md">
                  <BsSearch />
                </div>
              </div>
            </div>
            <button type="submit" />
          </form>
        )}

        {isOpen && (
          <div>
            <form
              onSubmit={handleAdvancedSubmit}
              className="flex flex-row gap-5 justify-center "
            >
              <span className="text-sm py-3 font-semibold text-blue-900 dark:text-blue-300">Advanced Fields</span>
              <div>
                <input
                  type="text"
                  name="title"
                  id="advSearch-item"
                  className="text-sm rounded-md block pl-3 
              bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Title"
                  onChange={handleAdvancedChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="description"
                  id="advSearch-item"
                  className="text-sm rounded-md block pl-3 
                bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Description.."
                  onChange={handleAdvancedChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="start"
                  id="advSearch-item"
                  className="text-sm rounded-md block pl-3 
                  bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Start Date..."
                  onChange={handleAdvancedChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="end"
                  id="advSearch-item"
                  className="text-sm rounded-md block pl-3 
                  bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="End Date..."
                  onChange={handleAdvancedChange}
                />
              </div>
              <button type="submit" />
            </form>
          </div>
        )}
        <div className="mt-2 text-sm">
          {/* TAGGED SEARCH */}
          <Select
            value={selectedTags}
            onChange={handleSearchTagChange}
            options={databaseTags}
            isMulti="true"
            isSearchable="true"
            isClearable="true"
            placeholder="Search Tags..."
            isLoading={databaseTags === undefined}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "blue" : "dark",
              }),
            }}
          />
        </div>
        <div className="flex text-xs mt-4 ml-3 gap-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            Advanced Search
          </button>
          <div>
            <button onClick={resetSearchTerms}>
              Reset Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
