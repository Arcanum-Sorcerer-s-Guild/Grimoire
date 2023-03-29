import React, { useEffect, useState } from "react";
import { mslContext } from "../App.js";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Textarea, Pagination, Card } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import Select from "react-select";
import "./singleEntry.css";

const SingleEntry = () => {
  const navigate = useNavigate();
  let params = useParams();
  const { srvPort } = React.useContext(mslContext);
  const [entry, setEntry] = useState({});
  const [totalEntries, setTotalEntries] = useState();
  const [updatedObj, setUpdatedObj] = useState();
  const { databaseTags } = React.useContext(mslContext);
  const [selectedTags, setSelectedTags] = useState();
  const [readyToSend,setReadyToSend] = useState(false)

  const handleSearchTagChange = (value) => {
    setSelectedTags(value);
  };

  const onClickUpdate = (e) => {
    e.preventDefault();
    let tagArray = [];
    console.log(selectedTags)

    const form = e.target;
    const formData = new FormData(form)

    if (selectedTags !== null) {
      if (selectedTags.length > 1) {
        console.log(1)
        selectedTags.map((tag) => tagArray.push(tag.value));
      } else if (selectedTags.length !== 0) {
        console.log(2)
        tagArray.push(selectedTags[0].value);
      }
    }
    console.log(tagArray)


      // setUpdatedObj({
      //     ...Object.fromEntries(formData.entries()),
      //     tags:selectedTags
      // })    

      
    
    console.log(updatedObj)
    //setReadyToSend(true)
  
  };

  useEffect(()=>{
    if(readyToSend) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({updatedObj}),
      };
      console.log(requestOptions.body)
      fetch(`http://localhost:${srvPort}/entries`, requestOptions)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        res.json();
        })
        .then((data) => {
          console.log(data);
          // navigate("/home")
          setShowUpdateModal(false);
          setReadyToSend(false)
        })
        .catch((err) => {
          console.log(err);
          alert(err)
        })
      }
      },[readyToSend])
    

  const onClickDelete = () => {
    setShowDeleteModal(false);
    console.log(params.id)
    fetch(`http://localhost:${srvPort}/entries/id=${params.id}`, {method: "DELETE"})
      .then((res) => res.json())
      .then((data) => {
        //TODO turn this into a real delete (get a returning value?)
        console.log(data);
      });
  };

  //COUNT ENTRIES
  useEffect(() => {
    fetch(`http://localhost:${srvPort}/countentries`)
      .then((res) => res.json())
      .then((data) => {
        setTotalEntries(data[0].count);
      });
  });

  //FETCH ENTRY FROM PARAMS.ID
  useEffect(() => {
    fetch(`http://localhost:${srvPort}/entries?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setEntry({
          id: data.data[0].id,
          title:
            data.data[0].title.charAt(0).toUpperCase() +
            data.data[0].title.slice(1),
          desc: data.data[0].description,
          unmodified:
            data.data[0].created === data.data[0].updated ? true : false,
          created_date: data.data[0].created.split("T")[0],
          created_time: data.data[0].created.split("T")[1].split(".")[0],
          updated_date: data.data[0].updated.split("T")[0],
          updated_time: data.data[0].updated.split("T")[1].split(".")[0],
          user: data.data[0].user,
          tags: data.data[0].tags,
        });
        if (data.data[0].tags[0] !== null) {
          setSelectedTags(data.data[0].tags.map( tag => {
            return({
              value:tag,
              label:tag
          })
          }))
      } 
      });
  }, [params.id]);

  const onPageChange = (value) => {
    navigate(`/home/${value}`);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <section className="col-span-2 place-items-center h-screen w-full">
      <div className="px-9">
        {entry ? (
          <>
            <Card>
              <div className="cardBox">
                {/* ENTRY DISPLAY */}
                <div className="decriptionBox">
                  {`${entry.title} by ${entry.user} created at ${entry.created_time} on ${entry.created_date} `}
                  <br />
                  {entry.unmodified === true ? (
                    <div></div>
                  ) : (
                    `Updated at ${entry.updated_time} on ${entry.updated_date}`
                  )}
                  <br />
                  <p>{entry.desc}</p><br/>
                  <p>{Array.isArray(entry.tags)  ?  entry.tags.map((tag,index) => <span key={index}>{tag}<br/></span>) : <span>No tags, why don't you add some!</span>}</p>
                </div>

                <div className="cardButtons">
                  {/* UPDATE BUTTON */}
                  <React.Fragment>
                    <Button onClick={() => setShowUpdateModal(true)}>
                      Update Entry
                    </Button>
                    <Modal
                      show={showUpdateModal}
                      size="md"
                      popup={true}
                      onClose={() => setShowUpdateModal(false)}
                    >
                      <Modal.Header />
                      <Modal.Body>
                      <form method="post" onSubmit={onClickUpdate}>
                        <div className="h-max">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Update Entry: {entry.title} 
                          </h3>
                          <div>User {entry.user} on {`${entry.created_date} at ${entry.created_time}`}
                            </div>
                          <textarea
                            name="description"
                            id="updatedDescription"
                            defaultValue={entry.desc}
                            rows={10}
                            />
                            {/* TAGGED SEARCH */}
                            <div className="updateTaggedSearch">
                            <Select
                              defaultValue={selectedTags}
                              onChange={handleSearchTagChange}
                              options={databaseTags}
                              isMulti="true"
                              isSearchable="true"
                              isClearable="true"
                              placeholder="Search Tags..."
                              loading={databaseTags === undefined}
                              noOptionsMessage="No tags in system... You should make some!"
                            />
                                  </div>
                          <div className="flex justify-center gap-4">
                          <Button type="submit">Update Entry</Button>
                          <Button
                            color="gray"
                            onClick={() => setShowUpdateModal(false)}
                          >
                            Cancel
                          </Button>
                          </div>
                        </div>
                      </form>
                      </Modal.Body>
                    </Modal>
                  </React.Fragment>
                  {/* DELETE BUTTON */}
                  <React.Fragment>
                    <Button
                      color="failure"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete Entry
                    </Button>
                    <Modal
                      show={showDeleteModal}
                      onClose={() => setShowDeleteModal(false)}
                      size="md"
                      popup={true}
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <div className="text-center">
                          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Delete Entry#{params.id}: {entry.title} permanently?
                          </h3>
                          <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={onClickDelete}>
                              Yes
                            </Button>
                            <Button
                              color="gray"
                              onClick={() => setShowDeleteModal(false)}
                            >
                              No
                            </Button>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </React.Fragment>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center text-center">
              {totalEntries ? (
                <Pagination
                  currentPage={parseInt(params.id)}
                  layout="pagination"
                  onPageChange={onPageChange}
                  showIcons={true}
                  totalPages={parseInt(totalEntries)}
                  previousLabel="Go back"
                  nextLabel="Go forward"
                />
              ) : (
                <div></div>
              )}
            </div>
          </>
        ) : (
          <div>No entry with that id.</div>
        )}
      </div>
    </section>
  );
};

export default SingleEntry;
