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
      
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Template ###</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Template created: ###</p>
      </div>
      <div class="border-t border-gray-200"></div>
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Title</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">title</dd>
      </div>
      <div class="border-t border-gray-200"></div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">Description</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Description</dd>
      </div>
      <div>
        <dd>
          <ul>
          </ul>
        </dd>
      </div>
    </dl>
  </div>





  <div className="flex justify-center pt-10"> <Button onClick={() => selectTemplate()}>Use Template</Button> </div>
        

    
    </div>
    </section>

  </>)



}


export default SingleTemplate