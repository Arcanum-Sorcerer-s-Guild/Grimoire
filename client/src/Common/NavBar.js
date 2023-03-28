import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import controlImage from "../assets/control.png";
import { FaDungeon, FaHatWizard } from 'react-icons/fa'; 
import { GiSpellBook } from 'react-icons/gi'; 

const NavBar = () => {
  const [ open, setOpen ] = useState(true);

  const links = [
    { name: 'Home', to: '/', icon: FaDungeon },
    { name: 'Post', to: '/', icon: GiSpellBook },
    { name: 'Login', to: '/', icon: FaHatWizard, margin: true },
  ];

  return (
    <div className="flex">
      <div className={` bg-slate-800 max-h-fit p-5 pt-8 relative duration-300 ${open ? "w-72" : "w-20"}`}>
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
                className={`absolute left-48 whitespace-pre font-semibold bg-slate-400 text-gray-900 rounded-md drop-shadow-lg ${open && "hidden"} 
                  px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {link?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
;
export default NavBar