import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  return (
    <>
      {loading && <Spinner animation="border" />}
      {user ? children : <Navigate to="/signin" state={{ from: location }} />}
    </>
  );
}

export default PrivateRoute;
