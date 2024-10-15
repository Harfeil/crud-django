import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
import Delete from "./components/Delete";

function App() {
  const myWidth = 220;
  return (
    <div className="App">
      <Navbar
        content={
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/about" element={<About />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/delete/:id" element={<Delete />} />
          </Routes>
        }
        drawerWidth={myWidth}
      />
    </div>
  );
}

export default App;
