import React,{useEffect, useState} from 'react'
import { mslContext } from "../App.js"
import {useParams, useNavigate} from 'react-router-dom'
import { Modal, Button, Textarea, Pagination, Card } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2"



const SingleEntry = () => {
  

  

  const navigate = useNavigate();
  let params = useParams()
  const { srvPort } = React.useContext(mslContext);
  const [entry, setEntry] = useState({})
  const [totalEntries, setTotalEntries] = useState()
  
  const onClickUpdate = () => {
    setShowUpdateModal(false)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify()
  };
    fetch( `http://localhost:${srvPort}/entries/id=${params.id}`, requestOptions)
    .then(res=>res.json())
    .then(data => {
      console.log(data)
    })
  }

  

  const onClickDelete = () => {
    setShowDeleteModal(false)
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify()
  };
    fetch( `http://localhost:${srvPort}/entries/id=${params.id}`, requestOptions)
    .then(res=>res.json())
    .then(data => {
      console.log(data)
    })
  }
  
  useEffect(()=> {
    fetch(`http://localhost:${srvPort}/countentries`)
    .then(res => res.json())
    .then(data => {
      setTotalEntries(data[0].count)
    })
  })


  useEffect(() => {
    fetch(`http://localhost:${srvPort}/entries?id=${params.id}`)
    .then(res => res.json())
    .then(data => {
      setEntry(data.data[0])    
    })
  },[params.id])

  const onPageChange = (value) => {
      navigate(`/home/${value}`)
  }

  const[showDeleteModal, setShowDeleteModal] = useState(false)
  const[showUpdateModal, setShowUpdateModal] = useState(false)

  return(
    <section className="col-span-2 place-items-center h-screen w-full">
    <div className="px-9">
      {entry ? <>
        <Card>
          {/* ENTRY DISPLAY */}
        {`Created: ${entry.title} by ${entry.user} on ${entry.created}`}<br/>
        {entry.updated === entry.created ? <div></div> : `Updated: ${entry.updated}` }<br/>
        <p>{entry.description}</p>
        

      {/* DELETE BUTTON */}
      <div className="flex">
      <React.Fragment>
        <Button onClick={() =>setShowDeleteModal(true)}>Delete Entry</Button>
        <Modal show={showDeleteModal} onClose={(()=>setShowDeleteModal(false))} size="md" popup={true}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Confirm deletion of entry#{params.id} {entry.title}
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={onClickDelete}>Yes</Button>
                <Button color="gray" onClick={()=>setShowDeleteModal(false)}>No</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
      {/* UPDATE BUTTON */}
      <React.Fragment>
        <Button onClick={()=> setShowUpdateModal(true)}>Update Entry</Button>
          <Modal 
            show={showUpdateModal}
            size="md"
            popup={true}
            onClose={()=>setShowUpdateModal(false)}
          >
            <Modal.Header />
            <Modal.Body>
              
              <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Update Entry
                </h3>
                <div>Title: {entry.title}</div>
                <div>Created On: {entry.created}</div>
                <div>Username: {entry.user}</div>
                <div>Update Description:</div>
                <Textarea id="updatedDescription" defaultValue={entry.description}rows={10} />
                <Button onClick={onClickUpdate}>Update Entry</Button>
                <Button color="gray" onClick={()=>setShowUpdateModal(false)}>Cancel</Button>
              </div>
            </Modal.Body>
          </Modal>
      </React.Fragment>
      </div>
      </Card>

      
    
  <div className="flex items-center justify-center text-center">

  {totalEntries ? 
  <Pagination
    currentPage={parseInt(params.id)}
    layout="pagination"
    onPageChange={onPageChange}
    showIcons={true}
    totalPages={parseInt(totalEntries)}
    previousLabel="Go back"
    nextLabel="Go forward"
    />
    :<div></div>}
</div>
    
    </> : <div>No entry with that id.</div> }
  </div>
  </section>
  )
}

export default SingleEntry;
