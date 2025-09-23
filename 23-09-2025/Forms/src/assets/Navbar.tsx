import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarLayout: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm rounded mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    MyApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="mx-2">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/MUI" className="mx-2">
                            MUI
                        </Nav.Link>
                        <Nav.Link as={Link} to="/pricing" className="mx-2">
                            Pricing
                        </Nav.Link>
                        <NavDropdown title="More" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/about">
                                About
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/contact">
                                Contact
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarLayout;