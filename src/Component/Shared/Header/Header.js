import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
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
            <NavLink to="/learnerSignup" className="nav-link text-uppercase">
              Signup as a Learner
            </NavLink>
            <NavLink to="/riderSignup" className="nav-link text-uppercase">
              Signup as a Rider
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
