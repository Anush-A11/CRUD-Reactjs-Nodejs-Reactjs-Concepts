import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const TopNavbar = () => {

  const { user, setUser } = useContext(UserContext);
  

  const handleLogout = ()=>{


    localStorage.clear()
    setUser(null)
    alert(`Successfully Logged Out`);


  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              {/* IF USER IS THERE IN THE LOCAL STORAGE THEN THERE WILL BE LOG OUT OR ELSE THERE WILL BE SIGN IN */}

              {user ? (
                <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
              ) : (
                <Nav.Link href="/log-in">Log In</Nav.Link>
              )}

              {!user && (
                <Nav.Link href="/sign-up">Sign Up</Nav.Link>
              ) }

              {user?.role === "Admin" ? (
                <Nav.Link href="/log-in">Settings</Nav.Link>
              ) : (
                <Nav.Link href="#">Contact Admin</Nav.Link>
              )}

              <Nav.Link href="#">Support Ticket?</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </div>
  );
};

export default TopNavbar;
