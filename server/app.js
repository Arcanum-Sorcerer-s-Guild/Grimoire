//Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//Controllers
const {
  getUsers,
  getTags,
  getEntries,
  createTag,
  createEntryTag,
  createEntry,
} = require("./db/controllers");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//Improper Route Handling
// Returns nothing for the home route
app.get("/", (req, res) => {
  res.status(200).json("server running");
});

// // Returns nothing for deeper entries routes
// app.use("/entries/*", (req, res) => {
//   res.status(200).json("server running");
// });

// // Returns nothing for deeper entries routes
// app.use("/tags/*", (req, res) => {
//   res.status(200).json("server running");
// });

app.get("/entries", (req, res) => {
  getEntries()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      })
    );
});

// Get a user from the DB
app.use("/users", (req, res) => {
  res.status(200).json(getUsers());
});
app.use("/getTags", (req, res) => {
  res.status(200).json(getTags());
});

// Get all tags from the DB
app.get("/tags", (req, res) => {
  getTags()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      })
    );
});

// Get all tags from the DB
app.get("/users", (req, res) => {
  getUsers()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      })
    );
});

//POST Requests


//Post a new Entry to the DB
app.post("/entries", (req, res) => {
  console.log(req.body)
  // getAllEntries()
  //   .then((data) => res.status(200).json(data))
  //   .catch((err) =>
  //     res.status(404).json({
  //       message:
  //         "The data you are looking for could not be found. Please try again",
  //     })
  //   );
});

// Post a new Template to the DB
// app.post("/templates", (req, res) => {
//   res.status(200).json({
//     message: "Post Request Sent! Server Running Successfully",
//   });
// });

//PUT Requests

//DELETE Requests

module.exports = app;
