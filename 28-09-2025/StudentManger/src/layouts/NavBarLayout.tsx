import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


const NavBarLayout: React.FC = () => {
    return (
        <div>
            <Navbar bg="light" variant="dartk" className="shadow-sm mb-3" fixed="top" expand="lg" >
                <Container>
                    <Navbar.Brand as={Link} to="/" className=" fw-bolder  text-danger">
                        #Student Manager
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="Navbar-setUP" />

                    <Navbar.Collapse id="Navbar-setUP">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/" className="mx-2">
                                Dashboard
                            </Nav.Link>
                            <Nav.Link as={Link} to="/studentform" className="mx-2">
                                Student
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}


export default NavBarLayout;