import './App.css';
import Entries from "./Home/Entries.js";
import Login from "./Login/Login.js"
import NavBar from "./Common/NavBar.js"
import PostEntry from "./PostEntry/PostEntry.js"
import { Routes, Route } from "react-router-dom";

export const mslContext = React.createContext();

// TODO create environmental variable for the current server PORT
//const port = process.env.SERVER_PORT || 3000;

function App() {
  const [srvPort,setSrvPort] = useState()
  setSrvPort(process.env.SERVER_PORT || 3000)

  return (
    <mslContext.Provider value={{srvPort}}>
      <NavBar />
      <Routes>
        <Route exact path = "/home" element={<Entries />} />
        {/* <Route path = "/templates" element={<Templates />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<PostEntry />} />
      </Routes>
    </mslContext.Provider>
  );
}

export default App;
