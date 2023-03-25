import './App.css';
import React, {useState, useEffect} from 'react'
import Entries from "./Home/Entries.js";
import Login from "./Login/Login.js"
import NavBar from "./Common/NavBar.js"
import PostEntry from "./PostEntry/PostEntry.js"
import { Routes, Route } from "react-router-dom";

//require("dotenv").config();

export const mslContext = React.createContext();

// TODO create environmental variable for the current server PORT
//const port = process.env.SERVER_PORT || 3000;

function App() {
  const [srvPort,setSrvPort] = useState(3001)
  const [databaseTags, setDatabaseTags] = useState();

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/tags`)
    .then(res => res.json())
    .then(data => {
      setDatabaseTags(data)
    })
  },[])

  return (
    <mslContext.Provider value={ {srvPort} }>
      <div>
      <NavBar />
      <Routes>
        <Route exact path = "/home" element={<Entries />} />
        {/* <Route path = "/templates" element={<Templates />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<PostEntry />} />
      </Routes>
      </div>
    </mslContext.Provider>
  )
}

export default App;
