import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <Navbar bg="info" variant="info" expand="lg" className="shadow-sm mb-5" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    E-Buy
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="mx-2">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products" className="mx-2">
                            Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart" className="mx-2">
                            Cart
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login" className="mx-2">
                            Profile/Login
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;