import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation: React.FC = () => (
  <Navbar bg="light" expand="lg" className="navigation">
    <Container>
      <Navbar.Brand href="#desks">Hack me</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink to="/desks">Desks</NavLink>
          <NavLink to="/employees">Employees</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;