import React, {useState, useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import Entries from "./Home/Entries.js";
import Login from "./Login/Login.js"
import Theme from "./Common/Theme.js"
import NavBar from "./Common/NavBar.js"
import PostEntry from "./PostEntry/PostEntry.js"
import './App.css';

//require("dotenv").config();

export const mslContext = React.createContext();

// TODO create environmental variable for the current server PORT
//const port = process.env.SERVER_PORT || 3000;

function App() {
  const [srvPort,setSrvPort] = useState(3001)
  const [databaseTags, setDatabaseTags] = useState();
  const [searchTerms, setSearchTerms] = useState({});

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/tags`)
    .then(res => res.json())
    .then(data => {
      setDatabaseTags(data)
    })
  },[])

  return (
    <mslContext.Provider value={ {srvPort, databaseTags, searchTerms, setSearchTerms} }>
      <section className="min-h-screen duration-100 dark:text-gray-100 dark:bg-slate-900">
      <Theme />
      <NavBar />
      <Routes>
        <Route path = "/home" element = {<Entries />} />
        {/* <Route path = "/" element={<Entries />} /> */}
        {/* <Route path = "/templates" element={<Templates />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<PostEntry />} />
      </Routes>
      </section>
    </mslContext.Provider>
  )
}

export default App;
