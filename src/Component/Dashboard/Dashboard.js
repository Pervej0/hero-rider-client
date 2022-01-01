import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user, logOut, isAdmin } = useAuth();
  return (
    <>
      <Navbar bg="light border border-left-0 border-right-0" className="py-2">
        <Container>
          <div className="d-flex align-items-center">
            <NavLink to="/" className="navbar-brand italic text-dark">
              <h1>HeroRider</h1>
            </NavLink>
          </div>
          <div className="d-flex align-items-center">
            <img
              src={user.photoURL}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <h4 className="mx-2">{user.displayName}</h4>
            <button
              type="button"
              onClick={logOut}
              className="border-0 bg-light"
            >
              <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
            </button>
          </div>
        </Container>
      </Navbar>
      <div className="row">
        <div className="text-center border col-2">
          <div>
            <Link to="/dashboard" className="nav-link text-uppercase h5 my-3">
              Dashboard
            </Link>
            {isAdmin && (
              <>
                <Link to="/dashboard/users" className="nav-link text-uppercase">
                  Users
                </Link>
                <Link
                  to="/dashboard/makeAdmin"
                  className="nav-link text-uppercase"
                >
                  Make Admin
                </Link>
              </>
            )}
            <Link to="/dashboard" className="nav-link text-uppercase">
              Order
            </Link>
            <Link to="/dashboard" className="nav-link text-uppercase">
              Profile
            </Link>
          </div>
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
