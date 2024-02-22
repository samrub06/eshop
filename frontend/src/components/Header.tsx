import { Badge, NavDropdown } from "react-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";

const Header: React.FC = () => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall("").unwrap();
      dispatch(logout({}));
      navigate("/");
    } catch (error) {}
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        {/* Container: the inner eleemts of the nav don't strectall the way to the edges of the window */}

        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>Eshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <FaShoppingCart />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg={"success"} style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a: any, c: any) => {
                        return a + c.qty;
                      }, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
