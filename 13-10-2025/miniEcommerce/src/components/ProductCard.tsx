import { Card, Button } from "react-bootstrap";
import type { ProductType } from "../types/productType";

type ProductCardProps = {
    product: ProductType;
};

export const ProductCard = ({ product }: ProductCardProps) => {

    

    return (
        <Card
            className="my-3 shadow-sm"
            style={{
                width: "18rem",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "0.3s ease-in-out",
            }}
        >
            <Card.Header className="bg-light fw-bold text-center">
                {product.name}
            </Card.Header>

            <Card.Body>
                <Card.Text className="text-muted mb-2">
                    {product.description}
                </Card.Text>

                <Card.Text>
                    💰 <strong>Price:</strong> ₹{product.price}
                </Card.Text>

                <Card.Text
                    className={
                        product.stock > 0 ? "text-success fw-semibold" : "text-danger fw-semibold"
                    }
                >
                    {product.stock > 0
                        ? `In Stock: ${product.stock}`
                        : "Out of Stock"}
                </Card.Text>
            </Card.Body>

            <Card.Footer className="text-center bg-white border-0">
                <Button
                    variant="success"
                    disabled={product.stock <= 0}
                    style={{ borderRadius: "8px" }}
                >
                    Add to Cart
                </Button>
            </Card.Footer>
        </Card>
    );
};
