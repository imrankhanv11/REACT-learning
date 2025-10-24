import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarLayout: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-5" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    E-Commerce Management
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="mx-2">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/from" className="mx-2">
                            Form
                        </Nav.Link>
                        <Nav.Link as={Link} to="/form2" className="mx-2">
                            Empty
                        </Nav.Link>
                        <Nav.Link as={Link} to="/empty" className="mx-2">
                            Empty
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarLayout;