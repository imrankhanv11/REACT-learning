import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store";
import { Button, Container, Row, Col, Card, Spinner, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../types/cartType";
import { fetchProducts } from "../store/slices/productSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, type OrderFormValues } from "../schemas/orderFormSchema";
import { clearCart } from "../store/slices/cartSlice";
import { orderItem } from "../store/slices/orderSlice";


const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.AuthStore.user);
    const cartList = useSelector((state: RootState) => state.CartStore.cartList);
    const products = useSelector((state: RootState) => state.ProductsStore.items);
    const loading = useSelector((state: RootState) => state.ProductsStore.loading);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const defaultFormValues: OrderFormValues = {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm<OrderFormValues>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: defaultFormValues
    });

    const [showModal, setShowModal] = useState(false);

    const onSubmit = (data: OrderFormValues) => {

        if (!user?.id) {
            navigate("/login");
            return;
        }

        dispatch(orderItem({
            userId: user.id,
            orders: {
                orderId: Date.now(),
                name: data.name,
                address: data.address,
                date: new Date().toISOString(),
                orderItems: cartItems
                    .map((m) => {
                        const item = products.find((n) => n.id === m.productId);
                        if (!item) return null;
                        return {
                            productId: item.id,
                            quantity: m.quantity,
                            total: item.price * m.quantity
                        };
                    })
                    .filter((i): i is NonNullable<typeof i> => i !== null)
            }
        }));


        reset(defaultFormValues);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        dispatch(clearCart({
            userId: Number(user?.id)
        }));
        navigate("/");
    };

    useEffect(() => {
        if (products.length === 0 && !loading) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length, loading]);

    useEffect(() => {
        const storedCart = cartList.find(c => c.userId === user?.id)?.cart;
        setCartItems(storedCart || []);
    }, [cartList, user]);

    const totalCost = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const product = products.find(p => p.id === item.productId);
            return product ? sum + product.price * item.quantity : sum;
        }, 0);
    }, [cartItems, products]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading your order...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center mt-5">
                <h4>Please login to see your cart.</h4>
                <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
        );
    }

    return (
        <Container className="my-5">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={6}>
                    <Button
                        variant="link"
                        className="mb-3 text-decoration-none text-danger"
                        onClick={() => navigate(-1)}
                    >
                        &larr; Back
                    </Button>
                    <Card className="mb-3">
                        <Card.Header><h5>Order Summary</h5></Card.Header>
                        <Card.Body>
                            {cartItems.map((item) => {
                                const product = products.find((p) => p.id === item.productId);
                                if (!product) return null;
                                return (
                                    <div key={product.id} className="d-flex justify-content-between mb-2">
                                        <span>{product.title} (x{item.quantity})</span>
                                        <span>${(product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                );
                            })}
                            <hr />
                            <h5>Total: ${totalCost.toFixed(2)}</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal
                show={showModal}
                onHide={handleClose}
                centered
                backdrop="static"
                size="lg"
            >
                <Modal.Header closeButton className="bg-success text-white">
                    <Modal.Title> Order Placed Successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Order Summary</h5>
                    <hr />
                    {cartItems.map((item) => {
                        const product = products.find((p) => p.id === item.productId);
                        if (!product) return null;
                        return (
                            <div key={product.id} className="d-flex justify-content-between mb-2">
                                <span>{product.title} (x{item.quantity})</span>
                                <span>${(product.price * item.quantity).toFixed(2)}</span>
                            </div>
                        );
                    })}
                    <hr />
                    <h5>Total: ${totalCost.toFixed(2)}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {cartItems.length > 0 && (
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="p-4 shadow-lg rounded">
                            <h2 className="text-center text-info mb-3">Shipping Details</h2>
                            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                                {["name", "phone", "email", "address", "city", "state", "zip"].map((field) => (
                                    <Form.Group className="mb-3" key={field}>
                                        <Form.Label>
                                            {field.charAt(0).toUpperCase() + field.slice(1)} <small className="text-danger">*</small>
                                        </Form.Label>
                                        <Form.Control
                                            type={field === "email" ? "email" : "text"}
                                            as={field === "address" ? "textarea" : undefined}
                                            rows={field === "address" ? 3 : undefined}
                                            placeholder={`Enter ${field}`}
                                            {...register(field as keyof OrderFormValues)}
                                            isInvalid={!!errors[field as keyof OrderFormValues]}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors[field as keyof OrderFormValues]?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                ))}

                                <Button type="submit" className="w-100" variant="success">
                                    Place Order
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            )}

        </Container>
    );
};

export default React.memo(Checkout);
