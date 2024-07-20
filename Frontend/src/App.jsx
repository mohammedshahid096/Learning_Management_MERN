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
import { getUserTokenDataCookie, removeAccessCookie } from "./config/cookie";
import Footer from "./components/Footer";
import { OnlineNavigator } from "./utils/OnlineNavigator";
import CustomSpeedDail from "./utils/SpeedDial";

const OtherComponets = () => {
  return (
    <>
      <Toaster />
      <OnlineNavigator />
      <CustomSpeedDail />
    </>
  );
};

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
    let isLogin = getUserTokenDataCookie();
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

  return (
    <div className="fullScreen app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {AllRoutesItems[user?.role ? user.role : "public"].map((category) => {
            return category.routes.map((route) => {
              if (route.protected) {
                return (
                  <Route
                    path={route.path}
                    key={route.num}
                    element={
                      <ProtectedRoute Access={route.Access}>
                        <route.element />
                      </ProtectedRoute>
                    }
                  />
                );
              } else {
                return (
                  <Route
                    path={route.path}
                    key={route.num}
                    element={<route.element />}
                  />
                );
              }
            });
          })}
        </Routes>
        <Footer />
        <OtherComponets />
      </BrowserRouter>
    </div>
  );
}

export default App;
