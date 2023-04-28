import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from './components/Signup'

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <NavBar/>
        <Alert message={"alert"}/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />


         
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
