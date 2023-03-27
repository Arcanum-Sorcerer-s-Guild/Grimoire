import React, {useState} from 'react';
import { RiSearchEyeLine } from "react-icons/ri";
import { mslContext } from "../App.js";
import Select from 'react-tailwindcss-select'

const SearchBar = () => {
  const [inputs, setInputs] = useState({});
  const { searchTerms, setSearchTerms, databaseTags} = React.useContext(mslContext);
  const [selectedTags,setSelectedTags] = useState(null)
  
  const handleSubmit = (event) => {
    let tagsStr = ''
  
    event.preventDefault();
    // console.log(selectedTags)
    // selectedTags.map(tag => {
    //   return(tagsStr += `tags=${tag.value}&`)
    // })

    setSearchTerms({q:inputs.q,tags:selectedTags.map(tag => `tags=${tag.value}`).join('&')})
    console.log(searchTerms);
  };


  const handleSearchTagChange = (value) => {
    setSelectedTags(value)
  }

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
          <div className="absolute flex inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>

          {/* BASIC SEARCH */}
          <input
            type="text"
            name="q"
            id="search-bar"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full pl-10 p-2
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            onChange={handleChange}
            required
          />
        </div>

        {/* TAGGED SEARCH */}
        {databaseTags !== undefined ?
        <Select
          value={selectedTags}
          onChange={handleSearchTagChange}
          options={databaseTags}
          isMultiple="true"
          isSearchable="true"
          placeholder="Search Tags..."
          />
        : <div>Loading...</div>}

        <button
          type="submit"
          className="font-medium text-white text-sm p-2 ml-1 bg-slate-900 rounded-md border
                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {React.createElement(RiSearchEyeLine, { size: "20" })}
          <span className="sr-only">Search</span>
        </button>
        <div>
        
        </div>
      </form>
    </div>
  );
};

export default SearchBar;