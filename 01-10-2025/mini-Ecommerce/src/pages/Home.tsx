import React, { useEffect, useContext } from "react";
import { Card, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../store/slices/productSlice";
import type { RootState, AppDispatch } from "../store/store";
import Hero from "../components/Hero";
import { ThemeContext } from "../context/themContext";

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const products = useSelector((state: RootState) => state.ProductsStore.items);
    const loading = useSelector((state: RootState) => state.ProductsStore.loading);
    const error = useSelector((state: RootState) => state.ProductsStore.error);

    useEffect(() => {
        if (products.length === 0 && !loading) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length, loading]);

    const featuredProducts = products.slice(0, 4);

    return (
        <div className="border-bottom">
            <Hero />

            <Container className="my-5">
                <h2 className={`text-center mb-4 ${theme === "dark" ? "text-light" : ""}`}>
                    Featured Products
                </h2>

                {loading ? (
                    <div className="text-center my-5">
                        <Spinner animation="border" variant={theme === "dark" ? "light" : "primary"} />
                        <p className={`mt-2 ${theme === "dark" ? "text-light" : ""}`}>Loading products...</p>
                    </div>
                ) : error ? (
                    <p className={`text-center text-danger`}>Failed to load products.</p>
                ) : (
                    <div>
                        <Row className="g-4 justify-content-center">
                            {featuredProducts.length > 0 ? (
                                featuredProducts.map((product) => (
                                    <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            className={`shadow-sm h-100 border-2 rounded-3 ${theme === "dark" ? "bg-dark text-white" : ""
                                                }`}
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="rounded-top-4"
                                                style={{ objectFit: "cover", height: "200px" }}
                                            />
                                            <Card.Body className="text-center d-flex flex-column">
                                                <Card.Title className="fw-semibold">{product.title}</Card.Title>
                                                <Card.Text className="text-success fw-bold">
                                                    ₹{product.price.toLocaleString()}
                                                </Card.Text>
                                                <Button
                                                    variant={theme === "dark" ? "light" : "primary"}
                                                    className="mt-auto w-100"
                                                    onClick={() => navigate(`/products/${product.id}`)}
                                                >
                                                    View Details
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <p className={`text-center text-muted`}>No products available.</p>
                            )}
                        </Row>
                    </div>
                )}
            </Container>

            {/* Promo Section */}
            <div
                className={`text-center py-5 ${theme === "dark" ? "text-light" : "text-white"
                    }`}
                style={{
                    background: "linear-gradient(90deg, #1d2671, #c33764)",
                }}
            >
                <Container>
                    <h3 className="fw-bold mb-3">Why Shop With Us?</h3>
                    <p className="lead mb-4">
                        We offer quality products, fast delivery, and 24/7 customer support.
                        Your satisfaction is our top priority.
                    </p>
                    <Button variant="light" className="px-4 fw-semibold">
                        Learn More
                    </Button>
                </Container>
            </div>
        </div>
    );
};

export default Home;
