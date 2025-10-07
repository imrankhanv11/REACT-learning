import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from '../components/Card';
import { Spinner, Form, Container, Row, Col, Button } from "react-bootstrap";

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.ProductsStore);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length]);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
        return uniqueCategories;
    }, [items]);

    const filteredItems = useMemo(() => {
        return items.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
            const matchesMinPrice = minPrice === "" || product.price >= minPrice;
            const matchesMaxPrice = maxPrice === "" || product.price <= maxPrice;
            return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
        });
    }, [items, searchTerm, selectedCategory, minPrice, maxPrice]);

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setMinPrice("");
        setMaxPrice("");
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <Spinner animation="border" />
            </div>
        );
    }

    if (error) return <p style={{ textAlign: "center" }}>Error: {error}</p>;

    return (
        <Container className="my-4"><Row
            className="justify-content-center mb-4 g-2 p-3 rounded shadow-sm bg-body border"
            style={{ borderColor: "#0d6efd" }}
        >
            <Col xs={12} md={3}>
                <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Col>
            <Col xs={12} md={3}>
                <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </Form.Select>
            </Col>
            <Col xs={6} md={2}>
                <Form.Control
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                />
            </Col>
            <Col xs={6} md={2}>
                <Form.Control
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                />
            </Col>
            <Col xs={6} md={2}>
                <Button variant="info" className="w-100" onClick={clearFilters}>
                    Clear
                </Button>
            </Col>
        </Row>

            <div className="d-flex flex-wrap justify-content-center">
                {filteredItems.length > 0 ? (
                    filteredItems.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="text-center w-100">No products found</p>
                )}
            </div>
        </Container>
    );
}

export default React.memo(Products);
