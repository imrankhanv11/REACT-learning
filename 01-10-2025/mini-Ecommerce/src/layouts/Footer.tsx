import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Footer: React.FC = () => {
    return (
        <footer className="footer mt-auto bg-black text-light py-4 border-top">
            <Container>
                <Row className="gy-3 text-center text-md-start">
                    
                    <Col md={4}>
                        <h5 className="fw-bold mb-3">E-Buy</h5>
                        <p className="small mb-0">
                            Your one-stop online shop for electronics, fashion, and more. Fast delivery and secure checkout guaranteed.
                        </p>
                    </Col>

                    <Col md={4}>
                        <h6 className="fw-bold mb-3">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li>
                                <a href="/" className="text-light text-decoration-none">Home</a>
                            </li>
                            <li>
                                <a href="/products" className="text-light text-decoration-none">Products</a>
                            </li>
                            <li>
                                <a href="/cart" className="text-light text-decoration-none">Cart</a>
                            </li>
                            <li>
                                <a href="/profile" className="text-light text-decoration-none">Profile</a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h6 className="fw-bold mb-3">Contact</h6>
                        <p className="small mb-1">support@ebuy.com</p>
                        <p className="small mb-1">+91 98765 43210</p>
                        <p className="small mb-0">123 E-Buy Street, Chennai, India</p>
                    </Col>
                </Row>

                <hr className="border-secondary my-3" />

                <Row>
                    <Col className="text-center small">
                        &copy; {new Date().getFullYear()} E-Buy. All Rights Reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;