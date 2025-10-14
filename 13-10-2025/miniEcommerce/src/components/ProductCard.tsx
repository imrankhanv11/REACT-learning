import { Card, Button } from "react-bootstrap";
import type { ProductType } from "../types/productType";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath } from "../store/app";
import { addToCart } from "../store/slices/cartSlice";
import type { RootState } from "../store/app";
import { useNavigate } from "react-router-dom";
import { decreseProductQuantity } from "../store/slices/productSlices";

type ProductCardProps = {
    product: ProductType;
};

export const ProductCard = ({ product }: ProductCardProps) => {

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.AuthStore.isAuthenticated);

    const dispatch = useDispatch<AppDispath>();
    const role = useSelector((state: RootState) => state.AuthStore.userDetails?.role);

    const addtoCartMethod = async (productId: number) => {

        if (!isAuthenticated) {
            toast.info("Please login first");
            navigate("/login");
            return;
        }

        // const values = {
        //     productId: productId,
        //     quantity: 1
        // }

        try {
            const response = await dispatch(addToCart({ productId: productId, quantity: 1 })).unwrap();
            dispatch(decreseProductQuantity({ id: productId }))
            if (response.productId === productId) {
                toast.success("Cart Added Succesfully");
            }
        }
        catch (err: any) {
            toast.error(err || "Network Error Try Again");
        }
    }

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
                {role !== "Admin" ? <Button
                    variant="success"
                    disabled={product.stock <= 0}
                    style={{ borderRadius: "8px" }}
                    onClick={() => addtoCartMethod(product.productId)}
                >
                    Add to Cart
                </Button> :
                    ""}
            </Card.Footer>
        </Card>
    );
};
