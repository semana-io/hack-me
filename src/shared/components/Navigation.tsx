import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation: React.FC = () => (
  <Navbar bg="light" expand="lg" className="navigation">
    <Container>
      <Navbar.Brand href="#desks">Hack me</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/desks">Desks</Nav.Link>
          <Nav.Link href="/employees">Employees</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;