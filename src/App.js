import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import DetailRestaurant from "./pages/DetailRestaurant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<DetailRestaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;