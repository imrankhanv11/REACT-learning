import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../store/store";
import useDecodeToken from "../hooks/useDecodeToken";
import { FaBook } from "react-icons/fa";

const NavBarLayout: React.FC = () => {
    const { isAutheticated } = useSelector((state: RootState) => state.AuthStore);
    const role = useDecodeToken();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

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
                    <FaBook /> BookAPI
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="Navbar-setUP" className="bg-light" />

                <Navbar.Collapse id="Navbar-setUP">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`mx-2 ${isActive("/") ? "text-warning fw-semibold" : "text-white"}`}
                        >
                            Home
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/books"
                            className={`mx-2 ${isActive("/books") ? "text-warning fw-semibold" : "text-white"}`}
                        >
                            Books
                        </Nav.Link>

                        {!isAutheticated ? (
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className={`mx-2 ${isActive("/login") ? "text-warning fw-semibold" : "text-white"}`}
                            >
                                Login
                            </Nav.Link>
                        ) : role === "Admin" ? (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/profile"
                                    className={`mx-2 ${isActive("/profile") ? "text-warning fw-semibold" : "text-white"}`}
                                >
                                    Profile
                                </Nav.Link>

                                <Nav.Link
                                    as={Link}
                                    to="/addproducts"
                                    className={`mx-2 ${isActive("/addproducts") ? "text-warning fw-semibold" : "text-white"}`}
                                >
                                    Add Products
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to="/profile"
                                className={`mx-2 ${isActive("/profile") ? "text-warning fw-semibold" : "text-white"}`}
                            >
                                Profile
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default React.memo(NavBarLayout);
