import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Ticketpage from "./pages/Ticketpage";
import Nav from "./components/Nav";
import CategoriesContext from "./context";

const App = () => {
  const [categories, setCategories] = useState(null);
  const value = { categories, setCategories };
  return (
    <div className="app">
      <CategoriesContext.Provider value={value}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticket" element={<Ticketpage />} />
            <Route
              path="/ticket/:id"
              element={<Ticketpage editMode={true} />}
            />
          </Routes>
        </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
};

export default App;
