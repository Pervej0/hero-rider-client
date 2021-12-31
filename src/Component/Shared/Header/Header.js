import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Header = () => {
  const { user, logOut } = useAuth();
  return (
    <Navbar bg="light" expand="lg">
      <Container className="border-bottom-1">
        <Link to="/" className="navbar-brand italic">
          HeroRider
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link font-weight-bold">
              Home
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/learnerSignup"
                  className="nav-link text-uppercase"
                >
                  Signup as a Learner
                </NavLink>
                <NavLink to="/riderSignup" className="nav-link text-uppercase">
                  Signup as a Rider
                </NavLink>
                <NavLink to="/signIn" className="nav-link text-uppercase">
                  Sign in
                </NavLink>
              </>
            ) : (
              <>
                <NavDropdown title={user.displayName} id="basic-nav-dropdown">
                  <NavLink to="/dashboard" className="nav-link text-uppercase">
                    Dashboard
                  </NavLink>
                </NavDropdown>

                <button
                  onClick={logOut}
                  className="bg-dark text-white px-3 fw-bold border-0 py-0 rounded"
                >
                  Log out
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
