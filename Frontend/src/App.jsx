import { useEffect } from "react";
import "./App.css";
import webfont from "webfontloader";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  UserDetailProfileAction,
  SocialUserLoginAction,
} from "./Redux/actions/auth.action";
import { useAuth0 } from "@auth0/auth0-react";
import AllRoutesItems from "./routes/AllRoutesItems";
import { removeAccessCookie } from "./config/cookie";
import Footer from "./components/Footer";

function App() {
  // ### react redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthState);

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

  const getLogout = () => {
    removeAccessCookie();
  };

  useEffect(() => {
    loadFonts();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (!user) {
      getLogout();
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      socailAuthSubmitHandler();
    }
  }, [isAuthenticated]);

  // console.log(isAuthenticated);

  return (
    <div className="fullScreen app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {AllRoutesItems.map((singleRoutes) => {
            if (singleRoutes.protected) {
              return (
                <Route
                  path={singleRoutes.path}
                  key={singleRoutes.num}
                  element={
                    <ProtectedRoute Access={singleRoutes.Access}>
                      <singleRoutes.element />
                    </ProtectedRoute>
                  }
                />
              );
            } else {
              return (
                <Route
                  path={singleRoutes.path}
                  key={singleRoutes.num}
                  element={<singleRoutes.element />}
                />
              );
            }
          })}
        </Routes>
      </BrowserRouter>
      <Footer />

      <Toaster />
    </div>
  );
}

export default App;
