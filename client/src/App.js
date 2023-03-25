import './App.css';
import Entries from "./Entries.js";
import Login from "./Login.js"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path = "/home" element={<Entries />} />
        {/* <Route path = "/templates" element={<Templates />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
