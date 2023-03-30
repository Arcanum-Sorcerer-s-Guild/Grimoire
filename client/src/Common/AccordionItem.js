import { Collapse } from "react-collapse";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Highlighter from "react-highlight-words";
import { mslContext } from "../App.js";
import React, { useState, useEffect } from "react";
import { Badge } from "flowbite-react";

const AccordionItem = ({
  open,
  toggle,
  title,
  dateCreated,
  dateUpdated,
  desc,
  tags,
  user,
}) => {
  const { searchTerms, highWords, setHighWords } = React.useContext(mslContext);

  useEffect(() => {
    if (Object.keys(searchTerms).length !== 0) {
      setHighWords(
        searchTerms.q.split("%").filter((a) => {
          return a !== "";
        })
      );
      // console.log(searchTerms.q.split("%").filter(a => {return(a !== '')}))
    }
    // console.log('searchTerms,highwords',searchTerms,highWords)
  }, [searchTerms]);

  return (
    <div className="pt-2 shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer py-3 px-5
                bg-slate-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onClick={toggle}
      >
        <p className="text-sm text-blue-800 dark:text-amber-500">
          {title}
          <span
            className={`${
              open && "hidden"
            } text-xs mx-1 text-gray-500 dark:text-gray-400`}
          >
            {user != undefined ? <>by {user}</> : <></>}
          </span>
          <span
            className={`${
              open && "hidden"
            } text-xs text-gray-500 dark:text-gray-400`}
          >
            {dateCreated != undefined ? <>on {dateCreated}</> : <></>}
          </span>
        </p>
        <div className="flex text-sm">
          <div className={`mr-5 ${open && "hidden"} flex flex-wrap gap-2`}>
            {tags ? (
              tags.map((tag, index) => {
                if (index < 3 && tag !== null) {
                  return (
                    <Badge key={index} color="dark">
                      {tag}
                    </Badge>
                  );
                }
              })
            ) : (
              <></>
            )}
          </div>
          <div>{open ? <AiOutlineMinus /> : <AiOutlinePlus />}</div>
        </div>
      </div>
      <Collapse isOpened={open}>
        <div
          className="text-sm px-5 pb-5
                 bg-slate-200 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        >
          <p
            className={`${
              !open && "hidden"
            } text-sm mb-2 text-gray-500 dark:text-gray-400`}
          >
            {user != undefined ? <>by {user}</> : <></>}
            <span
              className={`${
                !open && "hidden"
              } text-sm ml-2 text-gray-500 dark:text-gray-400 `}
            >
              {dateCreated != undefined ? <>created: {dateCreated}</> : <></>}
            </span>
            {dateCreated !== dateUpdated ? (
              <span
                className={`${
                  !open && "hidden"
                } text-sm ml-2 text-gray-500 dark:text-gray-400 `}
              >
                updated: {dateUpdated}
              </span>
            ) : (
              <span></span>
            )}
          </p>

          <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={highWords ? highWords : [""]}
            autoEscape={true}
            textToHighlight={desc}
          ></Highlighter>
          <div className={`mt-5 ${!open && "hidden"} flex flex-wrap gap-2`}>
            {tags ? (
              tags.map((tag, index) => {
                if (tag !== null) {
                  return (
                    <Badge key={index} color="dark">
                      {tag}
                    </Badge>
                  );
                }
              })
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default AccordionItem;
