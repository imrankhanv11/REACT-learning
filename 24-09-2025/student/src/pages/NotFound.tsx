import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "calc(100vh - 56px)" }}>
            <h1 className="display-1 text-danger">404</h1>
            <h2 className="mb-3">Oops! Page Not Found</h2>
            <p className="mb-4 text-secondary">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Button variant="dark" onClick={() => navigate("/")}>
                Go to Home
            </Button>
        </Container>
    )
}

export default NotFound;