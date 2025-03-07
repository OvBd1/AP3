import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import Products from "./components/Product/Product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
