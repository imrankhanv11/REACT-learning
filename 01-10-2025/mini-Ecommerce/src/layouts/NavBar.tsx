import React, { useContext } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/ToggleThemButton";
import { ThemeContext } from "../context/themContext";

const NavBar: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const carts = useSelector((state: RootState) => state.CartStore.cartList);
  const user = useSelector((state: RootState) => state.AuthStore.user);

  const cartItemsCount = carts.find((s) => s.userId === user?.id)?.cart.length || 0;

  return (
    <Navbar
      bg={theme === "dark" ? "dark" : "info"}
      data-bs-theme={theme}
      expand="lg"
      className="shadow-sm mb-5"
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} alt="Easy Buy Logo" width="35" height="35" className="me-2" />
          <span className="fw-bold text-white">Easy_Buy^</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/products" className="mx-2">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="mx-2">
              Cart <Badge bg="success" pill>{cartItemsCount}</Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="mx-2">{user ? "Profile" : "Login"}</Nav.Link>
            <ThemeToggle />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
