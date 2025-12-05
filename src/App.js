import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";

// Detect basename dynamically — GitHub pages vs localhost
const basename = process.env.NODE_ENV === "production" ? "/newsapp" : "/";

function App() {
  return (
    <Router basename={basename}>
      <Navbar />

      <Routes>
        <Route path="/" element={<News key="general" pageSize={5} country="us" category="general" />} />
        <Route path="/business" element={<News key="business" pageSize={5} country="us" category="business" />} />
        <Route path="/entertainment" element={<News key="entertainment" pageSize={5} country="us" category="entertainment" />} />
        <Route path="/sports" element={<News key="sports" pageSize={5} country="us" category="sports" />} />
        <Route path="/science" element={<News key="science" pageSize={5} country="us" category="science" />} />
        <Route path="/technology" element={<News key="technology" pageSize={5} country="us" category="technology" />} />
        <Route path="/health" element={<News key="health" pageSize={5} country="us" category="health" />} />
      </Routes>
    </Router>
  );
}

export default App;
