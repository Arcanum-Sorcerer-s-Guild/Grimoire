import React, { useState, useEffect } from "react";
import { mslContext } from "../App.js";
import { Pagination, Spinner } from "flowbite-react";


const Templates = () => {
  const { databaseTags, srvPort } = React.useContext(mslContext);
  const [templates, setTemplates] = useState();

  


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
        ? <div>Templates loaded!</div>
        : <Spinner aria-label="Extra large spinner example" size="xl" /> }




    
    </div>
    </section>

  </>)
}

export default Templates