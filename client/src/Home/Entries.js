import React, { useEffect, useState } from "react";
import { mslContext } from "../App.js";
import AccordionItem from "../Common/AccordionItem";
import DateObject from "react-date-object";
import {Link} from "react-router-dom"
import SearchBar from "../Common/SearchBar.js"

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const { searchTerms, setSearchTerms, databaseTags, srvPort } =
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
          setEntries(data.data)
        } else {
          setEntries(undefined);
        }
      });
  }, [searchTerms]);

  return (
    <>    
      <SearchBar />
      <section className="col-span-2 place-items-center max-h-fit w-full mb-5">
        <div className="px-9">
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
