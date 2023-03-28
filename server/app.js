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
  deleteEntry,
  createEntry,
  getUserByUsername,
  createUser,
  updateEntry,
  countEntries,
  getTemplates,
  deleteTemplate,
  updateTemplates,
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
  createEntry(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message: errorMessage,
      })
    );
});

app.post("/entries/:id", (req, res) => {
  const id = req.params.id;
  updateEntry(req.body, id)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message: errorMessage,
      })
    );
});

app.delete("/entries/:id", (req, res) => {
  // console.log(req.body);
  deleteEntry(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(404).json({
        message: errorMessage,
      })
    );
});

// register new user
app.post("/register", async (req, res) => {
  const { username, password, isAdmin } = req.body;

  // reject missing username or missing password
  if (username === undefined || password === undefined) {
    console.log("undefined user or pass");
    return res.sendStatus(403);
  }

  // reject duplicate username
  const duplicate = await getUserByUsername(username);
  if (duplicate.length > 0) {
    console.log("duplicate username of id:", duplicate[0].id);
    return res.sendStatus(403);
  }

  try {
    // hash password and insert user into database
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = await createUser(username, hashedPassword, isAdmin);
    const user = data[0];

    // create session cookie
    req.session.user = {
      userId: user.id,
      username: user.username,
      isAdmin: user.is_admin,
    };

    // send user object to front end for cookie
    res.status(200);
    return res.json(req.session.user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
});

// login existing user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // reject missing username or missing password
  if (username == undefined || password == undefined) {
    console.log("undefined user or pass");
    return res.sendStatus(403);
  }

  try {
    // search db for user
    const data = await getUserByUsername(username);

    // reject if user not found
    if (data.length === 0) {
      console.log("user not found");
      return res.sendStatus(403);
    }
    const user = data[0];
    console.log("user:", user);

    // compare password hashes and reject if incorrect
    const matches = bcrypt.compareSync(password, user.password);
    if (!matches) {
      console.log("incorrect password");
      return res.sendStatus(403);
    }

    // create session cookie
    req.session.user = {
      userId: user.id,
      username: user.username,
      isAdmin: user.is_admin,
    };

    // send user object to front end for cookie
    res.status(200);
    return res.json(req.session.user);
  } catch (err) {
    console.error(err);
    return res.sendStatus(403);
  }
});

// logout user
app.post("/logout", async (req, res) => {
  try {
    await req.session.destroy();
    console.log("logout successful");
    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// send user details to front end
app.post("/fetch-user", async (req, res) => {
  if (req.sessionID && req.session.user) {
    res.status(200);
    return res.json(req.session.user);
  }
  return res.sendStatus(403);
});

// Post a new Template to the DB
// app.post("/templates", (req, res) => {
//   res.status(200).json({
//     message: "Post Request Sent! Server Running Successfully",
//   });
// });
//Count Entries
app.get("/countentries", (req, res) => {
  const create = countEntries(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) =>
      res.status(204).json({
        mesage: errorMessage,
      })
    );
});

//Templates
app.get("/templates", (req, res) => {
  getTemplates()
    .then((data) => res.status(204).json(data))
    .catch((err) =>
      res.status(400).json({
        mesage: errorMessage,
      })
    );
});

app.get("/templates/:id", (req, res) => {
  getTemplates(req.params.id)
    .then((data) => res.status(204).json(data))
    .catch((err) =>
      res.status(204).json({
        mesage: errorMessage,
      })
    );
});

app.post("/templates/:id", (req, res) => {
  updateTemplates(req.body, req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(204).json({
        mesage: errorMessage,
      })
    );
});
app.post("/templates", (req, res) => {
  updateTemplates(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(204).json({
        mesage: errorMessage,
      })
    );
});
app.delete("/templates/:id", (req, res) => {
  deleteTemplate(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(204).json({
        mesage: errorMessage,
      })
    );
});

// wildcards
app.use("/*", (req, res) => {
  res.status(200).json("server running, unknown endpoint...");
});

app.use("/entries/*", (req, res) => {
  res.status(200).json("server running, unknown endpoint...");
});

app.use("/tags/*", (req, res) => {
  res.status(200).json("server running, unknown endpoint...");
});

module.exports = app;
