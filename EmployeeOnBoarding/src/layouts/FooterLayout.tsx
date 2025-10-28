import React from "react";  
import { Container, Col, Row } from "react-bootstrap";

const FooterLayout : React.FC = () =>{
    return(
        <footer className="footer mt-auto bg-dark text-white py-4">
            <Container>
                <Row className=" gy-3 text-center text-md-start">
                    <Col md={4} className="mt-2">
                        <h5 className="fw-bolder mb-3 text-danger">Employee Management</h5>
                        <p className="small">
                            On Boading and Calculations
                        </p>
                    </Col>

                    <Col md={4}>
                        <h6 className="fw-bolder mb-3 text-danger">Links</h6>
                        <ul className="list-unstyled small">
                            <li><a href="/" className="text-white text-decoration-none">Dashboard</a></li>
                            <li><a href="/" className="text-white text-decoration-none">Form</a></li>
                        </ul>
                    </Col>

                    <Col md={4}>
                        <h6 className="fw-bolder mb-3 text-danger">Contact Us</h6>
                        <p className="small mb-1">@Employee</p>
                        <p className="small mb-1">call: 1234567890</p>
                    </Col>
                </Row>

                <hr className=" border-danger my-3" />

                <Row>
                    <Col className="text-center small">
                         @2025 Employee Manager.
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default React.memo(FooterLayout);