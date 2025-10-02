import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../types/productType";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data: Product = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <Spinner animation="border" />
            </div>
        );
    }

    if (!product) {
        return <p className="text-center mt-5">Product not found.</p>;
    }

    return (
        <Container className="my-4">
            {/* Back Button */}
            <Button variant="link" className="mb-3 text-decoration-none" onClick={() => navigate(-1)}>
                &larr; Back to Products
            </Button>

            <Row className="align-items-center">
                {/* Product Image */}
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Img
                            variant="top"
                            src={product.images[0]}
                            alt={product.title}
                            style={{ height: "400px", objectFit: "contain", padding: "20px" }}
                        />
                    </Card>
                </Col>

                {/* Product Info */}
                <Col md={6}>
                    <h2 className="fw-bold">{product.title}</h2>
                    <p className="text-muted">Category: {product.category}</p>
                    <h3 className="text-success">${product.price}</h3>
                    <p style={{ lineHeight: 1.6 }}>{product.description}</p>


                    <Button variant="outline-success">Add to Cart</Button>
                    {/* <div className="d-flex gap-3 mt-4">
                    </div> */}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
