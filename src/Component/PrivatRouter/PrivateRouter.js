import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;
