import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { type AppDispath, type RootState } from "../store/app";
import { fetchAllProducts, clearError } from "../store/slices/productSlices";
import { ProductCard } from "../components/ProductCard";
import { ToastContainer } from "react-toastify";

const Products: React.FC = () => {
  const { items, loading, error } = useSelector((state: RootState) => state.ProductStore);
  const dispatch = useDispatch<AppDispath>();

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [items.length, dispatch]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger"> Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h3 className="text-center fw-bold mb-4">🛍️ Our Products</h3>
      <ToastContainer position="top-right" autoClose={2000} />

      {items.length > 0 ? (
        <Row className="g-5">
          {items.map((item) => (
            <Col key={item.productId} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">No products available.</p>
      )}
    </Container>
  );
};

export default React.memo(Products);
