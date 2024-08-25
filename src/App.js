import "./App.css";
import Home from "./component/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
