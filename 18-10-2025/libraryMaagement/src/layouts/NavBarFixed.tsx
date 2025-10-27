import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaSignOutAlt } from "react-icons/fa";
import { useDecodeToken } from "../hooks/useDecodeToken";
import { useDispatch, useSelector } from "react-redux";
import type { RootStateStore, StoreDispatch } from "../store/store";
import { logout } from "../features/authSlice";

const NavBarFixed: React.FC = () => {
    const role = useDecodeToken();
    const isAuthenticated = useSelector((state: RootStateStore) => state.AuthStore.isAuthenticated);
    const dispatch = useDispatch<StoreDispatch>();
    const navigate = useNavigate();

    if (!role && isAuthenticated) {
        dispatch(logout());
    }

    const adminLinks = (
        <>
            <Nav.Link as={Link} to="/books" className="text-white">
                Books
            </Nav.Link>
            <Nav.Link as={Link} to="/addbook" className="text-white">
                Add Book
            </Nav.Link>
        </>
    );

    const userLinks = (
        <Nav.Link as={Link} to="/books" className="text-white">
            Books
        </Nav.Link>
    );

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className="shadow-sm"
            style={{ background: "linear-gradient(90deg, #16325cff, #6610f2)" }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
                    <FaBook className="me-2" /> Course Management
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="Navbar-setUP" className="bg-light" />
                <Navbar.Collapse id="Navbar-setUP">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="text-white">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/practice" className=" text-white">
                            Practice
                        </Nav.Link>

                        {!isAuthenticated && (
                            <Nav.Link as={Link} to="/login" className="text-white">
                                Login
                            </Nav.Link>
                        )}

                        {isAuthenticated && role === "Admin" && adminLinks}
                        {isAuthenticated && role === "User" && userLinks}

                        {isAuthenticated && (
                            <Button
                                variant="outline-light"
                                className="ms-2 d-flex align-items-center"
                                onClick={() => {
                                    dispatch(logout());
                                    navigate("/", { replace: true });
                                }}
                            >
                                <FaSignOutAlt className="me-1" /> Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default React.memo(NavBarFixed);
