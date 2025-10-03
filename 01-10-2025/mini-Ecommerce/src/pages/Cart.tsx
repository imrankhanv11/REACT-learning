import React, { useMemo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { Button, Row, Container, Spinner } from "react-bootstrap";
import { updateQuantity, removeFromCart } from "../store/slices/cartSlice";
import { fetchProducts } from "../store/slices/productSlice";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/cartCard";

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.AuthStore.user);
    const cartList = useSelector((state: RootState) => state.CartStore.cartList);
    const products = useSelector((state: RootState) => state.ProductsStore.items);
    const loading = useSelector((state: RootState) => state.ProductsStore.loading);

    const navigate = useNavigate();

    useEffect(() => {
        if (products.length === 0 && !loading) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length, loading]);

    if (!user) {
        return (
            <div className="text-center mt-5">
                <h4>Please login to see your cart.</h4>
                <Button onClick={() => navigate("/login")}>Login</Button>
            </div>
        );
    }

    const cartItems = useMemo(() => {
        const userCart = cartList.find(c => c.userId === user?.id);
        return userCart?.cart || [];
    }, [cartList, user?.id]);

    const handleIncrease = useCallback((productId: number) => {
        const item = cartItems.find(ci => ci.productId === productId);
        if (item && user) {
            dispatch(updateQuantity({
                userId: user.id,
                productId,
                quantity: item.quantity + 1
            }));
        }
    }, [cartItems, dispatch, user]);

    const handleDecrease = useCallback((productId: number) => {
        const item = cartItems.find(ci => ci.productId === productId);
        if (item && item.quantity > 1 && user) {
            dispatch(updateQuantity({
                userId: user.id,
                productId,
                quantity: item.quantity - 1
            }));
        }
    }, [cartItems, dispatch, user]);

    const handleRemove = useCallback((productId: number) => {
        if (user) {
            dispatch(removeFromCart({ userId: user.id, productId }));
        }
    }, [dispatch, user]);


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
                <p className="mt-2">Loading your cart...</p>
            </div>
        );
    }

    return (
        <Container className="my-5">
            {cartItems.length === 0 ? (
                <div className="text-center mt-5">
                    <h4>Your cart is empty.</h4>
                    <h4>Please Add Products to Buy</h4>
                    <Button onClick={() => navigate("/products")}>Products</Button>
                </div>
            ) : (
                <>
                    <Row className="g-3">
                        {cartItems.map((item) => {
                            const product = products.find(p => p.id === item.productId);
                            if (!product) return null;
                            return (
                                <CartCard
                                    key={product.id}
                                    item={product}
                                    quantity={item.quantity}
                                    onIncrease={() => handleIncrease(product.id)}
                                    onDecrease={() => handleDecrease(product.id)}
                                    onRemove={() => handleRemove(product.id)}
                                />
                            );
                        })}
                    </Row>

                    <div className="mt-4 d-flex justify-content-between border p-2 rounded-3 bg-light shadow">
                        <h4>Total: ${totalCost.toFixed(2)}</h4>
                        <Button variant="success" onClick={() => navigate("/checkout")}>Buy Now</Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default React.memo(Cart);
