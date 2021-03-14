import logo from "../../assets/logo.png";

import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
const NavBar = () => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar className="container d-flex flex-column">
      <div className="container-fluid col-12">
        <Link className="navbar-brand mx-auto d-flex flex-row" to="/">
          <img src={logo} alt="logo" style={{ height: "60px" }} />{" "}
          <h1 className="ml-3">Driver Lagbe</h1>
        </Link>
      </div>
      <div className="container-fluid col-12">
        <Nav variant="pills" fill>
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav.Item>

          {currentUser && (
            <Nav.Item>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            </Nav.Item>
          )}
          {!currentUser && (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/admin">
                  Admin
                </Nav.Link>
              </Nav.Item>
            </>
          )}
          {currentUser && (
            <Nav.Item>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
