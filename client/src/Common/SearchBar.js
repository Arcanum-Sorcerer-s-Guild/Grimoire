import React, { useState } from "react";
import { mslContext } from "../App.js";
import Select, { components, MultiValueGenericProps } from "react-select";
import { FaSearchengin } from "react-icons/fa";

const SearchBar = () => {
  const [inputs, setInputs] = useState({});
  const [advancedInputs, setAdvancedInputs] = useState({});
  const [selectedTags, setSelectedTags] = useState(null);
  const { searchTerms, setSearchTerms, databaseTags, user } = React.useContext(mslContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event) => {
    let tagsToAdd = "";
    event.preventDefault();
    if (selectedTags !== null) {
      tagsToAdd = selectedTags.map((tag) => `tags=${tag.value}`).join("&");
    } 

    setSearchTerms({
        q: inputs.q,
        tags: tagsToAdd,
      });
    };
    
  const resetSearchTerms = (value) => {
      setInputs()
      setSearchTerms({})
      alert('Search terms reset!')
    }
    

    
    const handleAdvancedSubmit = (event) => {
      let tagsToAdd = "";
    event.preventDefault();
    
    if (selectedTags !== null) {
      tagsToAdd = selectedTags.map((tag) => `tags=${tag.value}`).join("&");
    } 
    setSearchTerms({...advancedInputs,tags:tagsToAdd})
    
  }

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

  return (<>
    <div className="col-span-2 w-full text-2xl p-7">
      {!user.username ? (
        <div className="text-sm mt-4">Log In</div>
      ) : (
        <div className="text-sm mt-4">
          Currently logged in as:
          <span className="ml-1 font-semibold">{user.username}</span>
        </div>
      )}
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
              bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Search..."
              onChange={handleChange}
            />
            <div className="absolute top-2 right-4 text-sm rounded-md">
              {React.createElement(FaSearchengin, { size: "20" })}
            </div>
          </div>
        </div>
        <button type="submit"/>
      </form>)}

        {isOpen && (
          <div >
            <form onSubmit={handleAdvancedSubmit} className="flex flex-row gap-5 justify-center ">
              <div><input
                type="text"
                name="title"
                id="advSearch-item"
                className="text-sm rounded-md block pl-3 
              bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Title"
                onChange={handleAdvancedChange}
                required
              /></div>
                <div><input
                  type="text"
                  name="description"
                  id="advSearch-item"
                  className="text-sm rounded-md block pl-3 
                bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Description.."
                  onChange={handleAdvancedChange}
                  required
                /></div>
              <div><input
                type="text"
                name="start"
                id="advSearch-item"
                className="text-sm rounded-md block pl-3 
              bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600"
                placeholder="Start Date..."
                onChange={handleAdvancedChange}
              /></div>
              <div><input
                type="text"
                name="end"
                id="advSearch-item"
                className="text-sm rounded-md block pl-3 
              bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600"
                placeholder="End Date..."
                onChange={handleAdvancedChange}
              /></div>
              <button type="submit"/>
            </form>
          </div>
        )}
          <div className="mt-2">
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
                  borderColor: state.isFocused ? 'blue' : 'dark',
                })}}
              
              />
          </div>
                <div>
                <button className="text-xs" onClick={() => setIsOpen(!isOpen)}>
                  Advanced Search
                </button>
                <div>
                 <button className="text-xs" onClick={resetSearchTerms}>Reset Search</button>
                 </div>
    </div>
              </div>
  </>);
};

export default SearchBar;
