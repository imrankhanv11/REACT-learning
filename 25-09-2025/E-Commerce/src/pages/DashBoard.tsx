import React, { type SetStateAction } from "react";
import { Button, Table, Form } from "react-bootstrap";
import type { products } from "../types/productsType";
import StudentRow from "../components/StudentRow";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { type searchColoumType } from "./Home";

interface DashBoardProbs {
    products: products[]
    deleteProucts: (id: number) => void;
    editProducts: (item: products) => void;
    searchColoum: searchColoumType;
    setSearchColoum: React.Dispatch<SetStateAction<searchColoumType>>;
    clearFilter: () => void;
    sortedValue: keyof products | "";
    setSortedValue: React.Dispatch<SetStateAction<keyof products | "">>;
}

const DashBoard: React.FC<DashBoardProbs> = ({ products, deleteProucts, editProducts, searchColoum, setSearchColoum, clearFilter, sortedValue, setSortedValue }) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="d-flex gap-2 mb-3">
                <Form.Select
                    value={sortedValue}
                    onChange={(e) => setSortedValue(e.target.value as keyof products)}
                >
                    <option value="">-- Default --</option>
                    <option value={"name"}>Name</option>
                    <option value={"type"}>Type</option>
                    <option value={"stock"}>Stock</option>
                </Form.Select>
                <Button variant="info" onClick={() => setSortedValue("")}>
                    Clear Sort
                </Button>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
            <div className=" m-2">
                <Button onClick={() => navigate("/from")}>
                    Add Produts
                </Button>
            </div>
            <Table responsive striped hover bordered>
                <thead className="text-center">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>
                            <Form.Control
                                disabled
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter the name"
                                value={searchColoum.name}
                                onChange={e => setSearchColoum(prev => (
                                    { ...prev, name: e.target.value }
                                ))}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter the type"
                                value={searchColoum.type}
                                onChange={e => setSearchColoum(prev => (
                                    { ...prev, type: e.target.value }
                                ))}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                placeholder="Enter the catergory"
                                value={searchColoum.catergory}
                                onChange={e => setSearchColoum(prev => (
                                    { ...prev, catergory: e.target.value }
                                ))}
                            />
                        </td>
                        <td>
                            <Form.Control
                                placeholder="Enter the stock"
                                value={searchColoum.stock}
                                onChange={e => setSearchColoum(prev => (
                                    { ...prev, stock: e.target.value }
                                ))}
                            />
                        </td>
                        <td>
                            <Form.Control
                                disabled
                            />
                        </td>
                        <td className=" d-flex justify-content-center">
                            <Button variant="info" className=" btn-sm" onClick={() => clearFilter()}>
                                Clear
                            </Button>
                        </td>
                    </tr>

                    {products.length === 0 ?
                        <tr className="text-center" >
                            <td colSpan={7} className=" text-danger">No product yet!!!</td>
                        </tr>
                        :
                        products.map((product) => (
                            <StudentRow key={product.id} product={product} deleteProucts={deleteProucts} editProducts={editProducts} />
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default React.memo(DashBoard);