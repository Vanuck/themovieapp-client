import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="primary" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          The Movie App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="-basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link className="navLink" as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="navLink" as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link className="navLink" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link
                  className="navLink"
                  as={Link}
                  to={`/profile/${user.Username}`}
                >
                  Profile
                </Nav.Link>
                <Nav.Link className="navLink" onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
