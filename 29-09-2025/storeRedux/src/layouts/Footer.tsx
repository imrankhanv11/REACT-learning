import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AppFooter: React.FC = () => {
    return (
        <footer className="footer mt-auto bg-dark text-light py-4">
            <Container>
                <Row className="gy-3 text-center text-md-start">
                    <Col md={4}>
                        <h5 className="fw-bold mb-3">Student Management</h5>
                        <p className="small mb-0">
                            A simple platform to manage students and teachers efficiently.
                        </p>
                    </Col>

                    <Col md={4}>
                        <h6 className="fw-bold mb-3">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li><a href="/" className="text-light text-decoration-none">Dashboard</a></li>
                            <li><a href="/form1" className="text-light text-decoration-none">Students</a></li>
                            <li><a href="/form2" className="text-light text-decoration-none">Teachers</a></li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h6 className="fw-bold mb-3">Contact</h6>
                        <p className="small mb-1">info@studentapp.com</p>
                        <p className="small mb-1">+91 98765 43210</p>
                    </Col>
                </Row>

                <hr className="border-secondary my-3" />

                <Row>
                    <Col className="text-center small">
                         @{new Date().getFullYear()} Student Management. All Rights Reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default AppFooter;
