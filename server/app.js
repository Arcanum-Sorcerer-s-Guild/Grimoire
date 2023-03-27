const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const {
  getUsers,
  getTags,
  getEntries,
  createTag,
  createEntryTagMiddle,
  createEntry,
} = require("./db/controllers");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const errorMessage =
  "The data you are looking for could not be found. Please try again";

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
  getEntries(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message: errorMessage,
        err,
      })
    );
});
app.get("/entries/:id", (req, res) => {
  getEntries({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message: errorMessage,
        err,
      })
    );
});

app.use("/users", (req, res) => {
  res.status(200).json(getUsers());
});
app.use("/getTags", (req, res) => {
  res.status(200).json(getTags(req.params.id));
});

app.get("/tags", (req, res) => {
  getTags()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message: errorMessage,
      })
    );
});

app.get("/users", (req, res) => {
  getUsers()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message: errorMessage,
      })
    );
});

app.post("/entries", (req, res) => {
  // console.log(req.body);
  const create = createEntry(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message: errorMessage,
      })
    );
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
