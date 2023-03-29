import React, {useState, useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import Entries from "./Home/Entries.js";
import UserAuth from './Login/UserAuth.js';
import SignUp from './Login/SignUp.js';
import NavBar from "./Common/NavBar.js"
import SearchBar from "./Common/SearchBar.js"
import PostEntry from "./PostEntry/PostEntry.js"
import SingleEntry from "./SingleEntry/SingleEntry.js"
import Templates from "./Templates/Templates.js"
import './App.css';

//require("dotenv").config();

export const mslContext = React.createContext();

// TODO create environmental variable for the current server PORT
//const port = process.env.SERVER_PORT || 3000;

function App() {
  const [srvPort,setSrvPort] = useState(3001)
  const [databaseTags, setDatabaseTags] = useState();
  const [searchTerms, setSearchTerms] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/tags`)
    .then(res => res.json())
    .then(data => {
      setDatabaseTags(data.map(tag => {
        return(
        {
          value:tag.name,
          label:tag.name
        }
        )
      }))
    })   
  },[])

  // Check if session already exists
  useEffect(() => {
    fetch(`http://localhost:${srvPort}/fetch-user`, {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userData) => setUser(userData));
  }, [])

  return (
    <mslContext.Provider value={ {srvPort, databaseTags, searchTerms, setSearchTerms, user, setUser} }>
      <section className="flex min-h-screen duration-100 dark:text-gray-100 dark:bg-slate-900">
      <NavBar />
      <div className="grid grid-flow-cols w-full">
        <SearchBar />
        <Routes>
          <Route path = "/home" element = {<Entries />} />
          <Route path = "/home/:id" element = {<SingleEntry />} />
          {/* <Route path = "/" element={<Entries />} /> */}
          <Route path = "/templates" element={<Templates />} />
          <Route path="/post" element={<PostEntry />} />
          <Route path="/login" element={<UserAuth />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      </section>
    </mslContext.Provider>
  )
}

export default App;