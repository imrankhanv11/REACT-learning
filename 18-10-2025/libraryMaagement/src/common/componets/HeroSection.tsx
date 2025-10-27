import React from "react";
import { Button, Container } from "react-bootstrap";
import { FaBook } from "react-icons/fa";

const HeroSection: React.FC = () => {
    return (
        <section
            className="hero-section text-black d-flex align-items-center"
            style={{
                minHeight: "70vh",
                background: "pink",
                backgroundSize: "cover",
            }}
        >
            <Container className="text-center">
                <h1 className="display-3 fw-bold mb-3">
                    <FaBook className="me-2" /> Welcome to Course Management
                </h1>
                <p className="lead mb-4">
                    Enroll, Learn, and Achieve your goals with the best courses and instructors.
                </p>
                <Button variant="warning" size="lg" className="fw-bold px-4">
                    Get Started
                </Button>
            </Container>
        </section>
    );
};

export default React.memo(HeroSection);
