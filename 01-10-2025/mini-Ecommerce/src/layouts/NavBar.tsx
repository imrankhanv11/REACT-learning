import React, { useMemo } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap"
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

const NavBar: React.FC = () => {
    const carts = useSelector((state: RootState) => state.CartStore.cartList);
    const user = useSelector((state: RootState) => state.AuthStore.user);

    const cartItemsCount = useMemo(() => {
        const cartItem = carts.find(s => s.userId === user?.id);
        return cartItem?.cart.length;
    }, [carts, user]);
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
                            Cart{"  "}
                            <Badge bg="success" pill>
                                {cartItemsCount}
                            </Badge>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login" className="mx-2">
                            {user? "Profile" : "Login"}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;