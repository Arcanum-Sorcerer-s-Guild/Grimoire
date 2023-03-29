import React, { useEffect, useState } from "react";
import { mslContext } from "../App.js";
import SearchBar from "../Common/SearchBar.js"


//React Apis
import AccordionItem from "../Common/AccordionItem";
import { Pagination, Spinner } from "flowbite-react";
import DateObject from "react-date-object";
import { Link, useNavigate } from "react-router-dom";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const { searchTerms, setSearchTerms, databaseTags, srvPort } =
    React.useContext(mslContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pageData, setPageData] = useState();

  const onPageChange = (value) => {
    setSearchTerms({ ...searchTerms, page: value });

  };

  const toggle = (index) => {
    if (open === index) {
      return setOpen(false);
    }
    setOpen(index);
  };

  //Search Terms Setup
  useEffect(() => {
    let searchTerm = "";
    if (searchTerms.q !== undefined) searchTerm += `q=${searchTerms.q}`;
    if (searchTerms.tags !== undefined) searchTerm += `&${searchTerms.tags}`;
    if (searchTerms.page !== undefined)
      searchTerm += `&page=${searchTerms.page}`;
    if (searchTerms.title !== undefined)
      searchTerm += `&title=${searchTerms.title}`;
    if (searchTerms.description !== undefined)
      searchTerm += `&description=${searchTerms.description}`;
    if (searchTerms.start !== undefined)
      searchTerm += `&start=${searchTerms.start}`;
    if (searchTerms.end !== undefined) searchTerm += `&end=${searchTerms.end}`;

    fetch(`http://localhost:${srvPort}/entries?${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data !== null) {
          console.log(data)
          setEntries(data.data);
          setPageData(data.pagination);
        } else {
          setEntries(undefined);
        }
      });
    // .then(result => navigate("/home"));
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
                  let dateCreated = new DateObject(entry.created).format(
                    "YYYY-MM-DD  HH:mm"
                  );
                  let dateUpdated = new DateObject(entry.updated).format(
                    "YYYY-MM-DD  HH:mm"
                  );

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
              <Spinner aria-label="Extra large spinner example" size="xl" />
            )}
          </div>
          <div className="flex items-center justify-center text-center">
            {pageData ? (
              <Pagination
                currentPage={parseInt(pageData.currentPage)}
                layout="pagination"
                onPageChange={onPageChange}
                showIcons={true}
                totalPages={parseInt(pageData.lastPage)}
                previousLabel="Go back"
                nextLabel="Go forward"
                className="mt-4"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Entries;
