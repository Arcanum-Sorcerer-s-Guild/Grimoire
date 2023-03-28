const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const knex = require("./db/dbConnections.js");
const app = express();

const {
  getUsers,
  getTags,
  getEntries,
  createTag,
  createEntryTagMiddle,
  createEntry,
  getUserByUsername,
  createUser,
} = require("./db/controllers");

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
const store = new KnexSessionStore({
  knex,
  tablename: "sessions",
});
app.use(
  session({
    store: store,
    secret: process.env.SESSION_SECRET || "6f646a6c6e6775306d7a68686d64637",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // in milliseconds: ms * s * m * h = 1 day
    },
  })
);

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
