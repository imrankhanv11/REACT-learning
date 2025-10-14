import type { AppDispath, RootState } from '../store/app';
import React, { useEffect } from 'react';
import { Spinner, Card, ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartsFetch, removeCart } from '../store/slices/cartSlice';
import type { CartItem } from '../types/cartType';
import { toast } from 'react-toastify';
import { increaseProductQuantity } from '../store/slices/productSlices';

const Cart: React.FC = () => {
    const { cartItems, loading, error } = useSelector((state: RootState) => state.CartStore);
    const dispatch = useDispatch<AppDispath>();

    useEffect(() => {
        if (cartItems.result.length === 0) {
            dispatch(getAllCartsFetch());
        }
    }, [cartItems.result.length, dispatch]);

    const removeCartMethod = async (item: CartItem) => {
        const value = { cartItemId: item.cartItemId, quantity: item.quantity, productId: item.productId };
        const productIncrese = { id: item.productId, quanitity: item.quantity }

        try {
            const response = await dispatch(removeCart(value)).unwrap();
            dispatch(increaseProductQuantity(productIncrese))
            if (response.cartItemId === value.cartItemId) {
                toast.info("cart Remove");
            }
        }
        catch (err: any) {
            console.error(err || "Error");
        }
    }

    if (loading) {
        return <Spinner className='d-flex justify-content-center align-items-center' />;
    }

    if (error) {
        return <div className='d-flex justify-content-center align-items-center'>{error}</div>;
    }

    return (
        <Card className="my-3 shadow-sm">
            <Card.Header className="bg-primary text-white fw-bold text-center">
                Your Cart
            </Card.Header>

            <ListGroup variant="flush">
                {cartItems.result.map((item) => (
                    <ListGroup.Item key={item.cartItemId}>
                        <Row className="align-items-center">
                            <Col xs={6}><strong>{item.productName}</strong></Col>
                            <Col xs={2}><Badge bg="info">{item.quantity}</Badge></Col>
                            <Col xs={2}>₹{item.price}</Col>
                            <Col xs={2} className="text-end">₹{item.subTotal}</Col>
                            <Col xs={2} ><button className=' btn btn-danger btn-sm' onClick={() => removeCartMethod(item)}>Remove</button></Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Card.Footer className="text-end fw-bold">
                Total: ₹{cartItems.totalAmount}
            </Card.Footer>
        </Card>
    );
};

export default React.memo(Cart);
