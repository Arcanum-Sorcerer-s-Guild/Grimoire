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
  const [updatedDesc, setUpdatedDesc] = useState();
  const { databaseTags } = React.useContext(mslContext);
  const [selectedTags, setSelectedTags] = useState(null);

  const handleSearchTagChange = (value) => {
    setSelectedTags(value);
  };

  const onClickUpdate = () => {
    setShowUpdateModal(false);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    };
    fetch(`http://localhost:${srvPort}/entries/id=${params.id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        //TODO turn this into a real update (get a returning value?)
        console.log(data);
      });
    console.log(selectedTags);
    console.log(updatedDesc);
  };

  const onClickDelete = () => {
    setShowDeleteModal(false);
    fetch(`http://localhost:${srvPort}/entries/id=${params.id}`, {
      method: "DELETE",
    })
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
          setSelectedTags(
            data.data[0].tags.map((tag) => {
              return {
                value: tag,
                label: tag,
              };
            })
          );
        }
      });
  }, [params.id]);

  const onPageChange = (value) => {
    navigate(`/home/${value}`);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUpdatedDesc({ description: value });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <section className="col-span-2 place-items-center h-screen w-full mt-10">
      <div className="px-9">
        {entry ? (
          <>
            <Card>
              <div className="p-2">
                <div className="text-3xl font-semibold p-2 text-amber-600">
                  {entry.title}
                <hr className="mt-2" />
                </div>
                {/* ENTRY DISPLAY */}
                <div className="flex justify-between text-sm my-2">
                  <div className="p-2">
                    {`by ${entry.user}`}
                  </div>
                  <div className="p-2">
                    {`created ${entry.created_date} |  ${entry.created_time}z `}
                  </div>
                </div>
                <div className="bg-slate-200 text-slate-800 rounded-md">
                  {entry.unmodified === true ? (
                    <div className="m-4"></div>
                  ) : (
                    `Updated at ${entry.updated_time} on ${entry.updated_date}`
                  )}
                  <p className="mx-4 py-5">{entry.desc}</p>
                  </div>
                  <div>
                  <div className="bg-slate-200 text-slate-800 rounded-md mt-2">
                    <p className="mx-4 py-2">
                      {Array.isArray(entry.tags) ? (
                        entry.tags.map((tag, index) => (
                          <span key={index}>{tag}</span>
                        ))
                      ) : (
                        <span>No tags, why don't you add some!</span>
                      )}
                    </p>
                  </div>
                </div>
                <hr className="mt-10" />
                {/* UPDATE BUTTON */}
                <div className="cardButtons mt-10">
                  <React.Fragment>
                    <Button 
                      className="bg-slate-700"
                      onClick={() => setShowUpdateModal(true)}
                    >
                      Update Entry
                    </Button>
                    <Modal
                      show={showUpdateModal}
                      size="5xl"
                      popup={true}
                      onClose={() => setShowUpdateModal(false)}
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Update Entry: 
                          <span className="text-xl font-medium text-amber-600 my-2 mx-2">
                            {entry.title}
                          </span>
                          </h3>
                          <hr />
                          <div className="flex justify-between mx-2 my-2">
                            <div className="text-sm ">
                              {`by ${entry.user}`}
                            </div>
                            <div className="text-sm ">
                              {`created: ${entry.created_date} | ${entry.created_time}z`}
                            </div>
                          </div>
                          <div className="mt-4">
                            <Textarea
                              id="updatedDescription"
                              defaultValue={entry.desc}
                              rows={10}
                              onChange={(event) => handleChange}
                              className="text-sm px-4"
                            />
                          </div>
                          {/* TAGGED SEARCH */}
                          <div className="updateTaggedSearch">
                            <Select
                              value={selectedTags}
                              onChange={handleSearchTagChange}
                              options={databaseTags}
                              isMulti="true"
                              isSearchable="true"
                              isClearable="true"
                              placeholder="Add Tags..."
                              loading={databaseTags === undefined}
                              noOptionsMessage="No tags in system... You should make some!"
                            />
                          </div>
                          <div className="flex justify-center gap-4">
                            <Button 
                              className="bg-slate-700 w-50"
                              onClick={onClickUpdate}
                            >
                              Update Entry
                            </Button>
                            {/* <Button
                              className="bg-slate-700 w-50"
                              onClick={() => setShowUpdateModal(false)}
                            >
                              Cancel
                            </Button> */}
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </React.Fragment>
                  {/* DELETE BUTTON */}
                  <React.Fragment>
                    <Button
                      className="bg-slate-700"
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
