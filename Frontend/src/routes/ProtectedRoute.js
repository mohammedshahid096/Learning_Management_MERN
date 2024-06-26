import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, Access }) => {
  const { user } = useSelector((state) => state.AuthState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate(-1);
      return;
    }
  }, [user]);

  useEffect(() => {
    if (!Access.includes(user?.role)) {
      navigate("/");
      return;
    }
  }, [location?.pathname]);

  return children;
};

export default ProtectedRoute;
