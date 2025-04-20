import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./component/features/dashboard/Dashboard";
import NewSidebar from "./component/NewSidebar"; // adjust path as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/instructions" element={<NewSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;

