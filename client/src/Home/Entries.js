import React, { useEffect, useState } from "react";
import { mslContext } from "../App.js";
import AccordionItem from "../Common/AccordionItem";
import DateObject from "react-date-object";
import { Link } from "react-router-dom";
import SearchBar from "../Common/SearchBar.js";
import Marquee from "react-fast-marquee";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const { searchTerms, setSearchTerms, databaseTags, srvPort, user } =
    React.useContext(mslContext);

  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(false);
    }
    setOpen(index);
  };

  useEffect(() => {
    let searchTerm = "";
    if (searchTerms.q !== undefined) searchTerm += `q=${searchTerms.q}`;
    if (searchTerms.tags !== undefined) searchTerm += `&${searchTerms.tags}`;

    fetch(`http://localhost:${srvPort}/entries?${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data !== null) {
          setEntries(data.data);
        } else {
          setEntries(undefined);
        }
      });
  }, [searchTerms]);

  return (
    <>
      <div className="mt-2 text-sm text-amber-600 overflow-hidden">
        <Marquee 
          pauseOnHover={true}
          speed={2}
        >
        {entries.map((entry, index) => {
          return (
            <AccordionItem
                      key={index}
                      open={index === open}
                      title={<Link to={`/Home/${entry.id}`}>{`${entry.title}`}</Link>}
                    />
            )
        })}
        </Marquee>
      </div>
      <SearchBar />
      <div className="text-sm font-semibold ml-5">Total Entries: </div>
      <section className="col-span-2 place-items-center max-h-fit mb-5">
        <div className="px-9 bg-slate-500 shadow-sm p-4 m-8 rounded-md">
          <div>
            {entries !== undefined ? (
              <div>
                {entries.map((entry, index) => {
                  let title = entry.title.toUpperCase();
                  let date = new DateObject(entry.created);
                  let dateCreated = date.format("YYYY-MM-DD");

                  return (
                    <AccordionItem
                      key={index}
                      open={index === open}
                      title={<Link to={`/Home/${entry.id}`}>{`${title}`}</Link>}
                      date={`${dateCreated}`}
                      desc={entry.description}
                      toggle={() => toggle(index)}
                    />
                  );
                })}{" "}
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Entries;

// {/* <div className= "col-span-2 italic text-xs text-end mr-5">
// {!user.username ? (
//   <div className=" mt-4">...</div>
// ) : (
//   <div className="mt-4">
//     currently logged in as:
//     <span className="ml-1 font-semibold">{user.username}</span>
//   </div>
// )}
// </div> */}
