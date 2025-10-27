import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className=" p-5">
      <Container className="text-center">
        <FaExclamationTriangle
          size={90}
          color="orange"
          className="mb-3"
        />

        <h1 className="display-1 fw-bold text-warning mb-2">404</h1>
        <h2 className="mb-3 fw-semibold">Oops! Page Not Found</h2>

        <p className="text-danger mb-4" style={{ fontSize: "1.1rem" }}>
          Sorry, the page was is out of service
        </p>

        <Button
          variant="warning"
          className="fw-bold px-4 py-2 rounded-pill shadow-sm"
          onClick={() => navigate("/", { replace: true })}
        >
          <FaHome className="me-2" /> Go to Home
        </Button>
      </Container>
    </div>
  );
};

export default NotFound;
