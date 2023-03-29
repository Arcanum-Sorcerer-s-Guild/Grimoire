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

  useEffect(()=>{
    fetch(`http://localhost:${srvPort}/templates`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setTemplates(data.data)
    })
  },[])

  return(<>
    <section className="col-span-2 place-items-center max-h-fit w-full mb-5">  
      <div className="px-9">
        {templates 
        ? <div>
                {templates.map((entry, index) => {
                  let title = entry.title.toUpperCase();
                  let dateCreated = new DateObject(entry.created).format(
                    "YYYY-MM-DD  HH:mm"
                  );

                  return (
                    <AccordionItem
                      key={index}
                      open={index === open}
                      title={<Link to={`/Templates/${entry.id}`}>{`${title}`}</Link>}
                      dateCreated={`${dateCreated}`}
                      desc={entry.description}
                      toggle={() => toggle(index)}
                      user={entry.user}
                    />
                  );
                })}{" "}
              </div>
        : <Spinner aria-label="Extra large spinner example" size="xl" /> }


        



    
    </div>
    </section>

  </>)
}

export default Templates