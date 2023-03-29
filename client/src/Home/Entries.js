import React, { useEffect, useState } from "react";
import { mslContext } from "../App.js";
import AccordionItem from "../Common/AccordionItem";
import { Pagination } from "flowbite-react";
import DateObject from "react-date-object";
import {Link} from "react-router-dom";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const { searchTerms, setSearchTerms, databaseTags, srvPort } =
    React.useContext(mslContext);

  const [open, setOpen] = useState(false);
  const [pageData, setPageData] = useState()
  
  const onPageChange = (value) => {
    console.log(value)
    
    setSearchTerms({...searchTerms,page:value })

    console.log(pageData.currentPage,searchTerms)
  }

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
    if (searchTerms.page !== undefined) searchTerm = `&page=${searchTerms.page}`
    console.log(searchTerm)
    fetch(`http://localhost:${srvPort}/entries?${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data !== null) {
          setEntries(data.data)
          console.log(data.pagination)
          setPageData(data.pagination)
          
        } else {
          setEntries(undefined);
        }
      });
  }, [searchTerms]);

  return (
    <>
      <section className="col-span-2 place-items-center max-h-fit w-full mb-5">
        <div className="px-9">
          <div>
            {entries !== undefined ? (
              <div>
                {entries.map((entry, index) => {
                  let title = entry.title.toUpperCase();
                  let dateCreated = new DateObject(entry.created).format("YYYY-MM-DD HH:mm");
                  let dateUpdated = new DateObject(entry.updated).format("YYYY-MM-DD HH:mm")

                  return (
                    <AccordionItem
                      key={index}
                      open={index === open}
                      title={<Link to={`/Home/${entry.id}`}>{`${title}`}</Link>}
                      dateCreated={`${dateCreated}`}
                      dateUpdated={`${dateUpdated}`}
                      desc={entry.description}
                      toggle={() => toggle(index)}
                      tags={entry.tags}
                      user={entry.user}
                    />
                  );
                })}{" "}
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
          <div className="flex items-center justify-center text-center">
          {pageData ? <Pagination
                    currentPage={parseInt(pageData.currentPage)}
                    layout="pagination"
                    onPageChange={onPageChange}
                    showIcons={true}
                    totalPages={parseInt(pageData.lastPage)}
                    previousLabel="Go back"
                    nextLabel="Go forward"
                  /> : <div>Loading</div>}
            </div>
        </div>
      </section>
    </>
  );
};

export default Entries;
