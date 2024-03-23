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
import {
  UserDetailProfileAction,
  SocialUserLoginAction,
} from "./Redux/actions/auth.action";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  // ### react redux
  const dispatch = useDispatch();

  const { isAuthenticated, user: AuthUser } = useAuth0();

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

  const socailAuthSubmitHandler = () => {
    const details = {
      name: AuthUser.name,
      email: AuthUser.email,
      picture: AuthUser.picture,
    };
    dispatch(SocialUserLoginAction(details));
  };

  useEffect(() => {
    loadFonts();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      socailAuthSubmitHandler();
    }
  }, [isAuthenticated]);

  console.log(isAuthenticated);

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
