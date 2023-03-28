import React, { useEffect, useState } from "react";
import { RiSunLine, RiComputerLine } from "react-icons/ri";
import { BsMoon } from "react-icons/bs";

const Theme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const options = [
    {
      icon: RiSunLine,
      text: "light",
    },
    {
      icon: BsMoon,
      text: "dark",
    },
    {
      icon: RiComputerLine,
      text: "system",
    },
  ];

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
      <div className="fixed top-2 right-5 rounded duration-100">
        {options?.map((opt) => (
          <button
            key={opt.text}
            className={`w-8 h-8 leading-9 m-1 ${
              theme === opt.text && "text-sky-600"
            }`}
            onClick={() => setTheme(opt.text)}
          >
            {React.createElement(opt.icon, { size: "20" })}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Theme;
