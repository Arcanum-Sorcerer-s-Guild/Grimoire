import React, { useEffect, useState } from "react";
import { mslContext } from "../App.js";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Pagination, Card, Badge } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import "./singleEntry.css";
import CreatableSelect from "react-select/creatable";

const SingleEntry = () => {
  const navigate = useNavigate();
  let params = useParams();
  const { databaseTags, srvPort } = React.useContext(mslContext);
  const [selectedTags, setSelectedTags] = useState();
  const [updatedObj, setUpdatedObj] = useState();
  const [totalEntries, setTotalEntries] = useState();
  const [entry, setEntry] = useState({});

  const handleSelectChange = (selections) => {
    setSelectedTags(selections);
  };

  const onClickUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    let tagArray = selectedTags.map((tag) => tag.value);
    setUpdatedObj({
      ...Object.fromEntries(formData.entries()),
      tags: tagArray,
    });
  };

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([updatedObj]),
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    };
    // TODO fix server/credentialing problems
    //createEntry {
    //   title: undefined,
    //   description: 'dasdfasdf',
    //   user_id: 108,
    //   tags: [ 'asdf' ]
    // }

    fetch(`http://localhost:${srvPort}/entries/${params.id}`, requestOptions)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        res.json();
      })
      .then((data) => {
        console.log(data);
        navigate(0);

        setShowUpdateModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updatedObj]);

  const onClickDelete = () => {
    setShowDeleteModal(false);
    const requestOptions = {
      method: "DELETE",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    };
    fetch(`http://localhost:${srvPort}/entries/${params.id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        alert(`{Entry ${params.id} Deleted!}`);
        console.log(data);
        navigate("/home");
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
        setSelectedTags(
          data.data[0].tags.map((tag) => {
            return {
              value: tag,
              label: tag,
            };
          })
        );
      });
  }, [params.id]);

  const onPageChange = (value) => {
    navigate(`/home/${value}`);
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
                  <div className="p-2">{`by ${entry.user}`}</div>
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
                  <div className="text-slate-800 rounded-md mt-2">
                    <p className="flex flex-wrap gap-2">
                      {Array.isArray(entry.tags) ? (
                        entry.tags.map((tag, index) => {
                          if (tag !== null) {
                            return (
                              <Badge key={index} color="dark">
                                {tag}
                              </Badge>
                            );
                          }
                        })
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>
                <hr className="mt-10" />
                {/* UPDATE BUTTON */}
                <div className="cardButtons mt-10">
                  <React.Fragment>
                    <Button
                      className="bg-slate-700 dark:bg-slate-500"
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
                        <form method="post" onSubmit={onClickUpdate}>
                          <div className="h-max">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              Update Entry: <span className=" text-xl text-amber-600">{entry.title}</span>
                            </h3>
                            <hr />
                            <div className="flex justify-between my-4 text-sm">
                              <span className="text-blue-900">
                                 by {entry.user}
                              </span>
                              {`created: ${entry.created_date} | ${entry.created_time}z`}
                            </div>
                            <textarea
                              className="w-full rounded-md bg-slate-200 border-none"
                              name="description"
                              id="updatedDescription"
                              defaultValue={entry.desc}
                              rows={10}
                            />
                            {/* TAGGED SEARCH */}
                            <div className="updateTaggedSearch">
                              <CreatableSelect
                                value={selectedTags}
                                isMulti
                                isLoading={databaseTags ? false : true}
                                options={databaseTags}
                                placeholder="Search..."
                                openOnFocus="true"
                                onChange={handleSelectChange}
                              />
                            </div>
                            <div className="flex justify-center gap-4">
                              <Button 
                                type="submit"
                                className="bg-slate-800 dark:bg-slate-500"
                              >
                                Update Entry
                              </Button>
                              {/* <Button
                                color="gray"
                                onClick={() => setShowUpdateModal(false)}
                              >
                                Cancel
                              </Button> */}
                            </div>
                          </div>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </React.Fragment>
                  {/* DELETE BUTTON */}
                  <React.Fragment>
                    <Button
                      className="bg-slate-700 dark:bg-slate-500"
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
