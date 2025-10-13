import type { AppDispath } from "../store/app";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import type { RootState } from "../store/app";
import { Container, Row, Col } from "react-bootstrap";
import { AdminProductCard } from "../components/AdminProductCard";
import { fetchAllProducts } from "../store/slices/productSlices";

const AdminDashBoard: React.FC = () => {

    const dispatch = useDispatch<AppDispath>();
    const items = useSelector((state: RootState) => state.ProductStore.items);
    const navigate = useNavigate();

    const logoutMethod = () => {
        dispatch(logout());
        navigate('/');
    }

    const addProducts = () => {
        navigate("/admin/addproducts")
    }

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [items.length, dispatch]);

    return (
        <div>
            <button onClick={() => logoutMethod()} className=" btn btn-danger">logout</button>
            <ToastContainer position="top-right" autoClose={2000} />
            <br />
            <button className=" btn btn-info" onClick={() => addProducts()} >Add Products</button>
            <hr />
            <Container className="my-4">
                <h3 className="text-center fw-bold mb-4">🛍️ Our Products</h3>

                {items.length > 0 ? (
                    <Row className="g-5">
                        {items.map((item) => (
                            <Col key={item.productId} xs={12} sm={6} md={4} lg={3}>
                                <AdminProductCard product={item} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-center text-muted">No products available.</p>
                )}
            </Container>
        </div>
    )
}

export default React.memo(AdminDashBoard);