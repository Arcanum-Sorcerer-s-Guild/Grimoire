import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import controlImage from "../assets/control.png";
import { FaDungeon, FaHatWizard } from 'react-icons/fa'; 
import { GiSpellBook } from 'react-icons/gi'; 
import { RiSearchEyeLine} from 'react-icons/ri'; 

const NavBar = () => {
  const [ open, setOpen ] = useState(true);

  const links = [
    { name: 'Home', to: '/', icon: FaDungeon },
    { name: 'Login', to: '/', icon: FaHatWizard },
    { name: 'Post', to: '/', icon: GiSpellBook, margin: true },
  ];

  return (
    <div className="flex gap-6">
      <div className={` bg-slate-800 h-screen p-5 pt-8 relative duration-300 ${open ? "w-72" : "w-20"}`}>
        <img 
          src={controlImage} 
          alt="control"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-slate-900 border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)} 
        />
        <div className="flex items-center text-3xl">
          <i
            className={`ss ss-parl3 cursor-pointer duration-500 text-amber-600 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`origin-left font-medium text-2xl text-white duration-300 ${!open && "scale-0"}`}
          >
            rcanum MSL
          </h1>
        </div>
        <div className="flex flex-col relative text-white mt-4">
          {links?.map((link, index) => (
            <Link 
              to={link.name} 
              key={index}
              className={`group flex gap-3.5 items-center text-sm font-medium p-2 hover:bg-gray-100/10 rounded-md ${link?.margin && "mt-5"}`}
            >
              <div>
                {React.createElement(link?.icon, {size:'20'})}
              </div>
              <h2
                style={{transitionDelay: `{index + 3}00ms`}}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {link?.name}
              </h2>
              <h2
                className={`absolute left-48 whitespace-pre font-semibold bg-white text-gray-900 rounded-md drop-shadow-lg ${open && "hidden"} 
                  px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {link?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 h-screen font-semibold text-2xl p-7">
            <form className="flex items-center mt-10">
                <label for="search-bar" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute flex inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    id='search-bar' 
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full pl-10 p-2
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder='Search'
                    required
                    />
                </div>
                <button
                  type='submit' 
                  className="font-medium text-white text-sm p-2 ml-1 bg-slate-900 rounded-md border
                    border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {React.createElement(RiSearchEyeLine, {size: "20"})}
                  <span className="sr-only">Search</span>
                </button>
            </form>
      </div>
    </div>
  )
}
;
export default NavBar