import './App.css';
import Entries from "./Home/Entries.js";
import Login from "./Login/Login.js"
import NavBar from "./Common/NavBar.js"
import PostEntry from "./PostEntry/PostEntry.js"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path = "/home" element={<Entries />} />
        {/* <Route path = "/templates" element={<Templates />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<PostEntry />} />
      </Routes>
    </div>
  );
}

export default App;
