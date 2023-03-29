import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mslContext } from "../App.js";
import "./common.css";

//icons
import { MdNavigateBefore } from "react-icons/md";
import {
  BsSearch,
  BsChevronDown,
  BsPerson,
  BsSun,
  BsMoon,
} from "react-icons/bs";
import { RiDashboardFill, RiComputerLine } from "react-icons/ri";
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";

const NavBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(true);
  const { user, setUser, srvPort } = React.useContext(mslContext);

  //Sidebar Nav Links
  const links = [
    { name: "Home", to: "/", icon: <AiOutlineHome /> },
    { name: "Post", to: "/", icon: <AiOutlineFileText /> },
    { name: 'Templates', to: '/', icon: <AiOutlineHome />},
    { name: "Login", to: "/", icon: <BsPerson />, spacing: true },
    {
      name: "Theme",
      icon: <AiOutlineSetting />,
      submenu: true,
      submenuItems: [
        { text: "light", icon: <BsSun /> },
        { text: "dark", icon: <BsMoon /> },
        { text: "system", icon: <RiComputerLine /> },
      ],
    },
    { name: "Logout", to: "/", icon: <AiOutlineLogout />, spacing: true },
  ];

  //Theme Setup
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
        localStorage.setItem("theme", "light");
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
    <>
      <div
        className={`relative bg-slate-900 h-fit p-5 pt-8 m-5 rounded-md
        ${open ? "w-96" : "w-20 "} duration-300`}
      >
        <MdNavigateBefore
          className={`absolute bg-white text-2xl rounded-full -right-3 top-9
          border border-slate-800 cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <i
            className={`brand ss ss-parl3 text-white bg-amber-500 text-4xl rounded-full
          cursor-pointer block float-left mr-1 ${
            !open && "rotate-[360deg]"
          } duration-300`}
          />
          <h1
            className={`text-white origin-left font-medium text-4xl px-2 ${
              !open && "scale-0"
            } duration-300`}
          >
            MSL
            <span className="text-xs ml-2">beta</span>
          </h1>
        </div>

        <hr className="my-4 bg-gray-200 border-1 dark:bg-gray-700" />

        {/* <div className={`flex items-center rounded-md mt-6 ${!open ? "px-2.5" : "px-4"} py-2 bg-light-white`}>
          <BsSearch 
            className={`text-white text-lg block float-left cursor-pointer ${!open && "mr-2"}`}
          />
            <input 
              type={"search"}
              placeholder="Search" 
              className={`text-base bg-transparent w-full text-white border-none focus:outline-none 
              ${!open && "hidden"}`}

            />
        </div> */}
        <div className="pt-2">
          {links.map((link, i) => (
            <>
              <Link
                key={i}
                to={link.name}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2
                hover:bg-light-white rounded-md ${
                  link.spacing ? "mt-9" : "mt-2"
                }`}
              >
                <span className="text-2xk block float-left">
                  {link.icon ? link.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 ${
                    !open && "hidden"
                  } duration-300`}
                >
                  {link.name}
                </span>
                {link.submenu && open && (
                  <BsChevronDown
                    className={`${subMenuOpen && "rotate-180"}`}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                )}
              </Link>
              {link.submenu && subMenuOpen && open && (
                <ul>
                  {link.submenuItems.map((submenuItems, i) => (
                    <li
                      key={i}
                      className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5
                      hover:bg-light-white rounded-md ${
                        link.spacing ? "mt-9" : "mt-2"
                      }
                      ${theme === submenuItems.text && "text-sky-600"}`}
                      onClick={() => setTheme(submenuItems.text)}
                    >
                      {submenuItems.icon} {submenuItems.text}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </div>
        <div className={`w-full float-right text-white italic ${!open && "hidden"}`}>
          {!user.username ? (
            <div className="text-sm mt-4">Log In</div>
          ) : (
            <div className="text-sm mt-4">
              Currently logged in as:
              <span className="ml-1 font-semibold">{user.username}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default NavBar;
