import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

const NavBarLayout: React.FC = () => {
    return (
        <Navbar
            expand="lg"
            fixed="top"
            className="shadow-sm"
            style={{
                background: "linear-gradient(90deg, #0d6efd, #6610f2)",
            }}
        >
            <Container>
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold text-white fs-4"
                    style={{ letterSpacing: "1px" }}
                >
                    <FaRocket /> Employee
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="Navbar-setUP" className="bg-light" />

                <Navbar.Collapse id="Navbar-setUP">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className=" text-white"
                        >
                            Employee
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default React.memo(NavBarLayout);
