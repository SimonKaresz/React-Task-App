import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const NavbarComponents = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <Navbar expand="lg" className="navbar text-center">
      <Container fluid>
        <Navbar.Brand className="brand">Task App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navLink ms-auto">
            <Nav.Link as={Link} to="/">
              {user ? <span>Home</span> : ""}
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              {user ? <span>Add new</span> : ""}
            </Nav.Link>
            <Nav.Link as={Link} to="/signUp">
              {!user ? (
                <span>Log In</span>
              ) : (
                <span onClick={signUserOut}>Log Out</span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
