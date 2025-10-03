import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import type { Product } from "../types/productType";

interface CartCardProps {
    item: Product;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ item, quantity, onIncrease, onDecrease, onRemove }) => {
    return (
        <Col md={6} lg={4}>
            <Card className="shadow-sm h-100 d-flex flex-column">
                <Card.Img
                    variant="top"
                    src={item.images[0]}
                    style={{ height: "170px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: "1rem", lineHeight: "1.2rem", height: "2.4rem", overflow: "hidden" }}>
                        {item.title}
                    </Card.Title>

                    <Card.Text
                        className="text-muted small flex-grow-1"
                        style={{
                            overflow: "hidden",
                            WebkitLineClamp: 3,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {item.description}
                    </Card.Text>

                    <Card.Text className="text-success">${item.price}</Card.Text>

                    <div className="d-flex align-items-center justify-content-between mt-auto">
                        <div className="d-flex align-items-center">
                            <Button variant="outline-secondary" size="sm" onClick={onDecrease}>-</Button>
                            <span className="mx-2">{quantity}</span>
                            <Button variant="outline-secondary" size="sm" onClick={onIncrease}>+</Button>
                        </div>
                        <Button variant="danger" size="sm" onClick={onRemove}>Remove</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default React.memo(CartCard);
