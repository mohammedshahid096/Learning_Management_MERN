import { useState, useEffect } from "react";
import "./App.css";
import webfont from "webfontloader";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch } from "react-redux";
import { UserDetailProfileAction } from "./Redux/actions/auth.action";

function App() {
  // ### react redux
  const dispatch = useDispatch();

  const loadFonts = () => {
    webfont.load({
      families: [
        "Poppins:300,500,400,600,700,800",
        "Roboto:300,500,400,600,700,800",
      ],
    });
  };

  const fetchUserDetails = () => {
    dispatch(UserDetailProfileAction());
  };

  useEffect(() => {
    loadFonts();
    fetchUserDetails();
  }, []);
  return (
    <div className="fullScreen app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
}

export default App;
