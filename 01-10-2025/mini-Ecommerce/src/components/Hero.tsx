import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Hero: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                color: "#fff",
                textAlign: "center",
                padding: "80px 20px",
            }}
        >
            <h1 className="fw-bold mb-3">Welcome to Our Online Store</h1>
            <p className="lead">
                Explore a wide range of premium products at unbeatable prices.
                Shop smart, shop easy, and enjoy fast delivery.
            </p>
            <Button
                variant="light"
                className="mt-3 px-4 py-2 fw-semibold"
                onClick={() => navigate("/products")}
            >
                Shop Now
            </Button>
        </div>
    )
}

export default Hero;