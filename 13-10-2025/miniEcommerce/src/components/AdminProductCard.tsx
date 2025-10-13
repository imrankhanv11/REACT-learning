import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import type { AppDispath } from "../store/app";
import type { ProductType } from "../types/productType";
import { updateQuantity } from "../store/slices/productSlices";

type ProductCardProps = {
    product: ProductType;
};

export const AdminProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useDispatch<AppDispath>();

    const [showForm, setShowForm] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [message, setMessage] = useState("");

    const handleUpdate = async () => {
        try {
            await dispatch(updateQuantity({ id: product.productId, quantity: quantity })).unwrap();
            setMessage(" Quantity updated successfully!");
            setShowForm(false);
        } catch (error: any) {
            setMessage(` ${error}`);
        }
    };

    return (
        <Card className="my-3 shadow-sm" style={{ width: "18rem", borderRadius: "12px", overflow: "hidden" }}>
            <Card.Header className="bg-light fw-bold text-center">{product.name}</Card.Header>

            <Card.Body>
                <Card.Text>💰 <strong>Price:</strong> ₹{product.price}</Card.Text>

                <Card.Text className={product.stock > 0 ? "text-success fw-semibold" : "text-danger fw-semibold"}>
                    {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                </Card.Text>

                {showForm && (
                    <div className="mt-3">
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min={1}
                            placeholder="Enter new quantity"
                        />
                        <Button variant="success" className="mt-2 w-100" onClick={handleUpdate}>
                            Confirm Update
                        </Button>
                    </div>
                )}

                {message && <p className="mt-2 text-center small text-muted">{message}</p>}
            </Card.Body>

            <Card.Footer className="text-center bg-white border-0">
                <Button variant="info" style={{ borderRadius: "8px" }} onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Cancel" : "Add Quantity"}
                </Button>
            </Card.Footer>
        </Card>
    );
};
