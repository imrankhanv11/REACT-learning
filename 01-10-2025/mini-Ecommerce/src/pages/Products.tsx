import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import type { RootState } from "../store/store";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from '../components/Card';

const Products: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.ProductsStore);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length]);

    if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;
    if (error) return <p style={{ textAlign: "center" }}>Error: {error}</p>;

    return (
        <div className=" d-flex flex-wrap justify-content-center">
            {items.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default React.memo(Products);