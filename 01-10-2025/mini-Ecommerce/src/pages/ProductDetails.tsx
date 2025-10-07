import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type AppDispatch, type RootState } from "../store/store";
import { addToCart } from "../store/slices/cartSlice";
import type { Product } from "../types/productType";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const productId = Number(id);

    if (isNaN(productId)) {
        return <div className="text-center p-4 text-danger">Invalid Product ID</div>;
    }

    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.AuthStore.user);

    const cartItem = useSelector((state: RootState) => state.CartStore.cartList);

    const isInCart = user
        ? cartItem
            .find((c) => c.userId === user.id)?.cart
            .some((ci) => ci.productId === Number(id))
        : false;

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

    const handleAddToCart = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!product) return;

        dispatch(
            addToCart({
                userId: user.id,
                item: {
                    productId: product.id,
                    quantity: 1,
                },
            })
        );
    };

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
        <Container className="my-5">
            {/* Back Button */}
            <Button variant="link" className="mb-3 text-decoration-none" onClick={() => navigate(-1)}>
                &larr; Back to Products
            </Button>

            <Card className="shadow-sm mb-4">
                <Card.Img
                    variant="top"
                    src={product.images[0]}
                    alt={product.title}
                    style={{ height: "400px", objectFit: "contain", padding: "20px" }}
                />
            </Card>

            <div className="mb-4">
                <h2 className="fw-bold">{product.title}</h2>
                <p className="text-muted mb-1">Brand: {product.brand}</p>
                <p className="text-muted mb-2">Category: {product.category}</p>

                <h3 className="text-success">${product.price.toFixed(2)}</h3>
                {product.discountPercentage > 0 && (
                    <Badge bg="warning" text="dark" className="mb-2">
                        {product.discountPercentage}% OFF
                    </Badge>
                )}

                <p style={{ lineHeight: 1.6 }}>{product.description}</p>

                {isInCart ? (
                    <Button variant="secondary" className="mt-3" onClick={() => navigate("/cart")}>
                        Already in Cart (Go to Cart)
                    </Button>
                ) : (
                    <Button variant="outline-success" className="mt-3" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                )}
            </div>

            <Card className="shadow-sm p-3">
                <h5 className="mb-3 fw-bold">Product Details</h5>
                <Row className="mb-2">
                    <Col xs={6} className="text-muted">Stock</Col>
                    <Col xs={6}>{product.stock}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6} className="text-muted">Rating</Col>
                    <Col xs={6}>{product.rating} / 5</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6} className="text-muted">SKU</Col>
                    <Col xs={6}>{product.sku}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6} className="text-muted">Weight</Col>
                    <Col xs={6}>{product.weight} kg</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6} className="text-muted">Dimensions</Col>
                    <Col xs={6}>
                        {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6} className="text-muted">Warranty</Col>
                    <Col xs={6}>{product.warrantyInformation}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6} className="text-muted">Shipping</Col>
                    <Col xs={6}>{product.shippingInformation}</Col>
                </Row>
                <Row className="mb-2">
                    <Col xs={6} className="text-muted">Availability</Col>
                    <Col xs={6}>{product.availabilityStatus}</Col>
                </Row>
                {product.tags.length > 0 && (
                    <Row>
                        <Col xs={6} className="text-muted">Tags</Col>
                        <Col xs={6}>{product.tags.join(", ")}</Col>
                    </Row>
                )}
            </Card>
        </Container>
    );
};

export default ProductDetails;
