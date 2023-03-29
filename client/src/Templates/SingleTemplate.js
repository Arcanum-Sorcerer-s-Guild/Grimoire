import React, {useEffect, useState} from 'react'
import { Spinner } from "flowbite-react";
import { mslContext } from "../App.js";


const SingleTemplate = () => {
  const { srvPort } = React.useContext(mslContext);
  const [template, setTemplate] = useState();

  useEffect(()=>{
    fetch(`http://localhost:${srvPort}/templates`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setTemplate(data.data)
    })
  },[])

  return(<>
    <section className="col-span-2 place-items-center max-h-fit w-full mb-5">  
      <div className="px-9">
        {template 
        ? <div>Templates loaded!</div>
        : <Spinner aria-label="Extra large spinner example" size="xl" /> }
        <div>Single Entry</div>



    
    </div>
    </section>

  </>)



}


export default SingleTemplate