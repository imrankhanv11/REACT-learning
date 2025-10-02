// pages/NotFound.tsx
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC =() => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "80vh" }}>
      <h1 className="display-1 fw-bold mb-3 text-warning">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="mb-4 text-secondary">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button onClick={() => navigate("/")} variant="dark">
        Go to Home
      </Button>
    </Container>
    );
}


export default NotFound;