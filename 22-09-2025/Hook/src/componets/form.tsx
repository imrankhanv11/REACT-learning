import React, { useContext, useRef } from "react";
import { useEffect, useState, useCallback } from "react";
import { type Expenses } from "../types/expense";
import { ThemeContext } from "../context/ThemeProvider";

type FormProbs = {
    onAdd: (expense: string, description: string, Category: string[], amount: number) => void;
    updateValue: Expenses | null;
    onUpdate: (id: number, expense: string, description: string, Category: string[], amount: number) => void;
}

export type expensesValue = {
    title: string;
    description: string;
    category: string[];
    amount: number;
};

export type ExpenseError = {
    title?: String,
    description?: String,
    category?: String,
    amount?: String
}


const Form: React.FC<FormProbs> = ({ onAdd, updateValue, onUpdate }) => {
    console.log("Form");

    const theme = useContext(ThemeContext);

    const inputRef = useRef<HTMLInputElement>(null);
    // State for storing form inputs
    const [formData, setFormData] = useState<expensesValue>({
        title: "",
        description: "",
        category: [] as string[],
        amount: 0
    })

    // Handling the Errors
    const [errors, setErrors] = useState<ExpenseError>({})

    // Handling the Form Input
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, type, value } = e.target;

            setFormData(prevData => {
                const key = name as keyof expensesValue;
                let newValue: any;

                if (type === "checkbox") {
                    const target = e.target as HTMLInputElement;
                    const arr = (prevData[key] as string[]) || [];
                    newValue = target.checked
                        ? [...arr, target.value]
                        : arr.filter(v => v !== target.value);
                } else if (type === "number") {
                    newValue = Number(value);
                } else {
                    newValue = value;
                }

                return {
                    ...prevData,
                    [key]: newValue
                };
            });
        },
        [setFormData]
    );

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    useEffect(() => {
        if (updateValue) {
            setFormData({
                title: updateValue.title ?? "",
                description: updateValue.description ?? "",
                amount: updateValue.amount ?? 0,
                category: updateValue.category ?? []
            });
        }
    }, [updateValue]);

    // Form Handling
    const formSumbit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            const validations: ExpenseError = Validatators(formData);

            if (Object.keys(validations).length > 0) {
                setErrors(validations);
                return;
            }

            setErrors({});

            if (updateValue) {
                onUpdate(
                    updateValue.id,
                    formData.title,
                    formData.description,
                    formData.category,
                    formData.amount
                );
            } else {
                onAdd(
                    formData.title,
                    formData.description,
                    formData.category,
                    formData.amount
                );
            }
            setFormData({
                title: "",
                description: "",
                amount: 0,
                category: []
            });

            inputRef.current?.focus();
        },
        [formData, updateValue, onAdd, onUpdate, setErrors, setFormData]
    );

    const Validatators = (data: expensesValue) => {
        const newErrors: ExpenseError = {}

        if (!data.title.trim()) {
            newErrors.title = "Title can't be empty";
        } else if (data.title.trim().length > 20) {
            newErrors.title = "Title can't be more than 20 characters";
        }

        if (!data.description.trim()) {
            newErrors.description = "Description can't be empty";
        } else if (data.description.trim().length > 50) {
            newErrors.description = "Description can't be more than 50 characters";
        }

        if (!data.category || data.category.length === 0) {
            newErrors.category = "Select at least one category";
        }

        if (data.amount === undefined || isNaN(data.amount)) {
            newErrors.amount = "Amount must be a number";
        } else if (data.amount <= 0) {
            newErrors.amount = "Amount must be greater than zero";
        } else if (data.amount > 100000) {
            newErrors.amount = "Amount can't exceed 100,000";
        }

        return newErrors;
    }


    const bgClass = theme?.theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";


    return (
        <div>
            <form className={`container mt-3 p-4 border rounded ${bgClass}`} style={{ maxWidth: "650px" }} onSubmit={formSumbit}>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter expense title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        ref={inputRef} />
                    <small className=" text-danger">{errors.title && errors.title}</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows={3}
                        value={formData.description}
                        placeholder="Enter description"
                        onChange={handleChange}
                        name="description"
                        style={{ resize: "none" }}
                    ></textarea>
                    <small className=" text-danger">{errors.description && errors.description}</small>
                </div>

                <div className="mb-3">
                    <label className="form-label d-block">Category</label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            id="food"
                            value="Food"
                            name="category"
                            checked={formData.category.includes("Food")}
                            onChange={handleChange} />
                        <label className="form-check-label" htmlFor="food">Food</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            id="transport"
                            value="Transport"
                            checked={formData.category.includes("Transport")}
                            onChange={handleChange}
                            name="category" />
                        <label className="form-check-label" htmlFor="transport">Transport</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="checkbox"
                            id="salary"
                            value="Salary"
                            checked={formData.category.includes("Salary")}
                            onChange={handleChange}
                            name="category" />
                        <label className="form-check-label" htmlFor="salary">Salary</label>
                    </div>
                    <br />
                    <small className=" text-danger">{errors.category && errors.category}</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleChange}
                        name="amount" />
                    <small className=" text-danger">{errors.amount && errors.amount}</small>
                </div>

                <button type="submit" className={updateValue ? "btn btn-info" : "btn btn-success"}>
                    {updateValue ? "Update" : "Add"}
                </button>
            </form>

        </div>
    )
}

export default React.memo(Form);