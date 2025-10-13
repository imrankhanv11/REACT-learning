import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/app";

const NavBarLayout: React.FC = () => {

    const { isAuthenticated } = useSelector((state: RootState) => state.AuthStore);
    const role = useSelector((state: RootState) => state.AuthStore.userDetails?.role);

    return (
        <Navbar bg="light" variant="dartk" className="shadow-sm mb-3" fixed="top" expand="lg" >
            <Container>
                <Navbar.Brand as={Link} to="/" className=" fw-bolder  text-danger">
                    API
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="Navbar-setUP" />

                <Navbar.Collapse id="Navbar-setUP">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="mx-2">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products" className="mx-2">
                            Products
                        </Nav.Link>
                        {isAuthenticated ?
                            role === "User" ?
                                <Nav.Link as={Link} to="/dashboard" className="mx-2">
                                    Dashboard
                                </Nav.Link> :
                                <Nav.Link as={Link} to="/admin/dashboard" className="mx-2">
                                    Admin Dashboard
                                </Nav.Link>
                            : <Nav.Link as={Link} to="/login" className="mx-2">
                                Login
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default React.memo(NavBarLayout);