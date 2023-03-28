const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const {
  getUsers,
  getTags,
  getEntries,
  createEntry,
  countEntries,
  getTemplates,
  deleteTemplate,
  updateTemplates,
} = require("./db/controllers");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const errorMessage =
  "The data you are looking for could not be found. Please try again";

app.get("/", (req, res) => {
  res.status(200).json("server running");
});

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

//Count Entries
app.get("/countentries", (req,res)=> {
  const create = countEntries(req.body)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) =>
      res.status(404).json({
        mesage:errorMessage,
      })
    );
})

//Templates
app.get("/templates", (req, res) => {
  getTemplates().then((data) => res.status(200).json(data));
});

app.get("/templates/:id", (req, res) => {
  getTemplates(req.params.id).then((data) => res.status(200).json(data));
});

app.post("/templates/:id", (req, res) => {
  updateTemplates(req.body, req.params.id).then((data) =>
    res.status(200).json(data)
  );
});
app.post("/templates", (req, res) => {
  updateTemplates(req.body).then((data) => res.status(200).json(data));
});
app.delete("/templates/:id", (req, res) => {
  deleteTemplate(req.params.id).then((data) => res.status(200).json(data));
});

// wildcards
app.use("/*", (req, res) => {
  res.status(200).json("server running");
});

app.use("/entries/*", (req, res) => {
  res.status(200).json("server running");
});

app.use("/tags/*", (req, res) => {
  res.status(200).json("server running");
});

module.exports = app;
