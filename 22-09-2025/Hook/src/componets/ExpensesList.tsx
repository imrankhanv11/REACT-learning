import React, { useContext } from "react";
import { type Expenses } from "../types/expense";
import { ThemeContext } from "../context/ThemeProvider";

type ExpenseListProbs = {
    items: Expenses,
    onDelete: (id: number) => void;
    onEdit: (data: Expenses) => void;
}

const ExpenseList: React.FC<ExpenseListProbs> = ({ items, onDelete, onEdit }) => {
    const theme = useContext(ThemeContext);
    console.log("List");

    const bgClass = theme?.theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";
    return (
        <div className={`d-flex justify-content-center mt-3 mb-1`}>
            <div className={`card shadow-sm border-0  ${bgClass}`} style={{ width: "60%", maxWidth: "700px" }}>
                <div className="card-body p-3 d-flex justify-content-between align-items-center">

                    <div>
                        <h5 className="mb-1 fw-bold text-primary">{items.title}</h5>
                        <p className="mb-1 small">{items.description}</p>
                        <p className="mb-1">
                            <strong>Amount:</strong> {items.amount}
                        </p>
                        <p className="mb-0">
                            <strong>Category:</strong> {items.category.join(", ")}
                        </p>
                    </div>

                    <div className="d-flex flex-column gap-2 ms-3">
                        <button
                            onClick={() => onEdit(items)}
                            className="btn btn-sm btn-outline-info"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(items.id)}
                            className="btn btn-sm btn-outline-danger"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ExpenseList);