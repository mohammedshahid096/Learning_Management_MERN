import { useState, useEffect } from "react";
import "./App.css";
import webfont from "webfontloader";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import { Toaster } from "react-hot-toast";

function App() {
  const loadFonts = () => {
    webfont.load({
      families: [
        "Poppins:300,500,400,600,700,800",
        "Roboto:300,500,400,600,700,800",
      ],
    });
  };

  useEffect(() => {
    loadFonts();
  }, []);
  return (
    <div className="fullScreen app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
}

export default App;
