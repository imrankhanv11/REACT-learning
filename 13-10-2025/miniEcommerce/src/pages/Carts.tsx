import type { AppDispath, RootState } from '../store/app';
import React, { useEffect } from 'react';
import { Spinner, Card, ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartsFetch } from '../store/slices/cartSlice';

const Cart: React.FC = () => {
    const { cartItems, loading, error } = useSelector((state: RootState) => state.CartStore);
    const dispatch = useDispatch<AppDispath>();

    useEffect(() => {
        if (cartItems.result.length === 0) {
            dispatch(getAllCartsFetch());
        }
    }, [cartItems.result.length, dispatch]);

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
