import React from "react";
import type { products } from "../types/productsType";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface StudentRowProbs {
    product: products;
    deleteProucts: (id: number) => void;
    editProducts: (item: products) => void;
}


const StudentRow: React.FC<StudentRowProbs> = ({ product, deleteProucts, editProducts }) => {
    const navigate = useNavigate();
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.type}</td>
            <td>{product.categories.join(", ")}</td>
            <td>{product.stock}</td>
            <td>{product.addedDate ? new Date(product.addedDate).toDateString() : ""}</td>
            <td className=" d-flex gap-1 justify-content-around">
                <Button variant="danger" onClick={() => deleteProucts(product.id)} className=" btn-sm" >
                    Delete
                </Button>

                <Button variant="info" onClick={() => {
                        editProducts(product);
                        navigate("/from");
                }} className=" btn-sm">
                    Edit
                </Button>
            </td>
        </tr>
    );
};

export default React.memo(StudentRow);