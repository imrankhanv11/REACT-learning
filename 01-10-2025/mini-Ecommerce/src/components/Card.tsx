import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { type Product } from "../types/productType";

interface ProductCardProps {
    product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    }

    return (
        <Card
            style={{ width: "18rem", margin: "10px", cursor: "pointer" }}
            onClick={handleClick}
            className="shadow-sm d-flex flex-column"
        >
            <Card.Img
                variant="top"
                src={product.images[0]}
                style={{ height: "170px", objectFit: "cover" }}
            />
            <Card.Body style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ flexGrow: 3 }}>
                    <Card.Title>{product.title}</Card.Title>
                    <p
                        className="text-muted"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {product.description}
                    </p>
                    <div className="d-flex justify-content-between mt-2">
                        <Card.Text>
                            <strong className=" text-success">${product.price}</strong>
                        </Card.Text>
                        <Card.Text>
                            ⭐ {product.rating} / 5
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
