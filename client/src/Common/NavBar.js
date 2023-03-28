import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiSunLine, RiComputerLine } from "react-icons/ri";
import { BsMoon } from "react-icons/bs";
import { mslContext } from "../App.js";

import controlImage from "../assets/control.png";
import { FaDungeon, FaHatWizard } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const NavBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(true);
  const { user } = React.useContext(mslContext);

  const links = [
    { name: "Home", to: "/", icon: FaDungeon },
    { name: "Post", to: "/", icon: GiSpellBook },
    { name: "Login", to: "", icon: FaHatWizard, margin: true },
    {
      name: "Theme",
      to: "/",
      icon: IoIosSettings,
      submenu: true,
      submenuItems: [
        { title: "light", icon: RiSunLine, text: "light" },
        { title: "dark", icon: BsMoon, text: "dark" },
        { title: "system", icon: RiComputerLine, text: "system" },
      ],
    },
  ];

  //theme setup
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;

      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "dark");
        break;

      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  return (
    <div className="flex">
      <div
        className={` bg-slate-800 max-h-fit p-5 pt-8 relative duration-300 ${
          open ? "w-72" : "w-20"
        }`}
      >
        <img
          src={controlImage}
          alt="control"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-slate-900 border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center text-3xl">
          <i
            className={`ss ss-parl3 cursor-pointer duration-500 text-amber-600 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`origin-left font-medium text-2xl text-white duration-300 ${
              !open && "scale-0"
            }`}
          >
            rcanum MSL
          </h1>
        </div>
          <hr className="my-4 bg-gray-200 border-1 dark:bg-gray-700"/>
        <div className="text-white italic text-xs">
          {!user.username ? (
            <div className=" mt-4">Log In</div>
          ) : (
            <div className="mt-4">
              Currently logged in as:
              <span className="ml-1 font-semibold">{user.username}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col relative text-white mt-4">
          {links?.map((link, index) => (
            <>
              <Link
                to={link.name}
                key={index}
                className={`group flex gap-3.5 items-center text-sm font-medium p-2 hover:bg-gray-100/10 rounded-md ${
                  link?.margin && "mt-5"
                }`}
              >
                <div>{React.createElement(link?.icon, { size: "20" })}</div>
                <h2
                  style={{ transitionDelay: `{index + 3}00ms` }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {link?.name}
                </h2>
                <h2
                  className={`absolute left-48 whitespace-pre font-semibold bg-slate-400 text-gray-900 rounded-md drop-shadow-lg ${
                    open && "hidden"
                  } 
                  px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {link?.name}
                </h2>
                {link.submenu && (
                  <button
                    className={`${subMenuOpen && "rotate-180"}`}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  >
                    {React.createElement(MdOutlineKeyboardArrowDown, {
                      size: "20",
                    })}
                  </button>
                )}
              </Link>
              {link.submenu && subMenuOpen && open && (
                <ul className={`${!open && "scale-0"}`}>
                  {link.submenuItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-x-4 cursor-pointer p-2 ml-10"
                    >
                      <button
                        className="flex gap-3"
                        onClick={() => setTheme(item.text)}
                      >
                        {React.createElement(item.icon, { size: "20" })} {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
