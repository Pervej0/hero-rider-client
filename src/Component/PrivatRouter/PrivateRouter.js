import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : user ? (
        children
      ) : (
        <Navigate to="/signin" state={{ from: location }} />
      )}
    </>
  );
}

export default PrivateRoute;
