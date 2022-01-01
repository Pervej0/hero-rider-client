import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

function AdminRoute({ children }) {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();
  console.log(isLoading);
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : isAdmin ? (
        children
      ) : (
        <Navigate to="/" state={{ from: location }} />
      )}
    </>
  );
}

export default AdminRoute;
