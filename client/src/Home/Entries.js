import React, { useEffect, useState } from "react";
import { mslContext } from "../App.js";
import AccordionItem from "../Common/AccordionItem";

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
    let searchTerm = `q=${searchTerms.q}&${searchTerms.tags}`;

    console.log(searchTerm)

    fetch(`http://localhost:${srvPort}/entries?${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
          // console.log(data)
          setEntries(data);
        });
    }, [searchTerms]);
    
    return (
    <>
      <section className="col-span-2 place-items-center h-screen w-full">
        <div className="px-9">

      <div>
        {entries.length !== 0 ? (
          <div>
            {" "}
            
            {entries.map((entry,index) => {
              return (
                    
                <AccordionItem
                key={Math.random()}
                open={index === open}
                title={`${entry.title} ${entry.created}`}
                desc={entry.description}
                toggle={() => toggle(index)}
                />
                
                ///PREVIOUS search for reference
                // {`Title: ${entry.title} Created: ${entry.created} Username: ${entry.user} Started: ${entry.description} Tags: `}
                // {entry.tagsarray.map((tag) => (
                  //   <span key={Math.random()}>{` ${tag}`}</span>
                  // ))}
                  
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