import './App.css';
import Entries from "./Home/Entries.js";
import Login from "./Login/Login.js"
import NavBar from "./Common/NavBar.js"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path = "/home" element={<Entries />} />
        {/* <Route path = "/templates" element={<Templates />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
