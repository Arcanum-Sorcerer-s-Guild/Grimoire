import React, { useState, useEffect } from "react";
import { mslContext } from "../App.js";
import { Pagination, Spinner } from "flowbite-react";
import AccordionItem from "../Common/AccordionItem";
import DateObject from "react-date-object";
import { Link } from "react-router-dom";

const Templates = () => {
  const { srvPort } = React.useContext(mslContext);
  const [templates, setTemplates] = useState();
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(false);
    }
    setOpen(index);
  };

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/templates`)
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
      });
  }, []);

  return (
    <>
      <section className="col-span-2 place-items-center max-h-fit w-full mb-5">
        <div className="px-9 mt-5">
          <h1 className="text-2xl text-amber-600 font-semibold my-2">
            Entry Templates
          </h1>
          <hr className="my-2" />
          {templates ? (
            <div>
              {templates.map((entry, index) => {
                let title = entry.name.toUpperCase();

                return (
                  <AccordionItem
                    key={index}
                    open={index === open}
                    title={
                      <Link to={`/Templates/${entry.id}`}>{`${title}`}</Link>
                    }
                    desc={entry.form_data.description}
                    toggle={() => toggle(index)}
                  />
                );
              })}{" "}
            </div>
          ) : (
            <Spinner aria-label="Extra large spinner example" size="xl" />
          )}
        </div>
      </section>
    </>
  );
};

export default Templates;
