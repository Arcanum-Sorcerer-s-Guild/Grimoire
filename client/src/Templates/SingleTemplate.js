import React, {useEffect, useState} from 'react'
import { Spinner, Button } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import { mslContext } from "../App.js";


const SingleTemplate = () => {
  const { srvPort, templateValues, setTemplateValues } = React.useContext(mslContext);
  const [template, setTemplate] = useState();
  const navigate = useNavigate();

  const selectTemplate = () => {
    let description1 = "SLKDJfsjd"
    let title1 = "laksjdfls"
    setTemplateValues( {
      description: description1,
      title: title1
    })
    navigate('/post')
  }

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

        <Button onClick={() => selectTemplate()}>Use Template</Button>
        

    
    </div>
    </section>

  </>)



}


export default SingleTemplate