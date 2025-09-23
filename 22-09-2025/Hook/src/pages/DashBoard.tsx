import type React from "react";
import Form from "../componets/form";
import ExpenseList from "../componets/ExpensesList";
import { type Expenses } from "../types/expense";
import UseLocalStorage from "../hooks/UseLocalStroge";
import { useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeProvider";
import ExpensesTotal from "../componets/expensesTotal";

const Dashboard: React.FC = () => {

    const theme = useContext(ThemeContext);
    console.log("Parent");
    const [expensesValue, setExpense] = UseLocalStorage<Expenses[]>("expenses", []);
    const [updateValue, setUpdateValue] = useState<Expenses | null>(null);

    // Add New Expenses
    const addExpense = useCallback((expense: string, description: string, Category: string[], amount: number) => {
        const newExpense: Expenses = {
            id: Date.now(),
            title: expense,
            description: description,
            category: Category,
            amount: amount
        }

        setExpense(prev => [...prev, newExpense]);

        toast.success("New Expenses Added Succesfully");
    }, [setExpense]);

    // Delete new Expenses
    const deleteExpense = useCallback((id: number) => {
        setExpense((prev) => prev.filter(t => t.id !== id));
        toast.error("Expenses Deleted sucesfully");
    }, [setExpense]);

    // Edit new Expenses
    const editExpense = useCallback((data: Expenses) => {
        setUpdateValue(data);
    }, [setUpdateValue]);

    // Update
    const updateExpense = useCallback((id: number, title: string, description: string, category: string[], amount: number) => {
        setExpense((prev) =>
            prev.map(t =>
                t.id === id ? { ...t, title, description, category, amount } : t
            )
        );

        setUpdateValue(null);
        toast.info("Expenses Edited Successfully");
    }, [setExpense, setUpdateValue]);

    // Total Spend
    const totalSpend: number = useMemo(() => {
        return expensesValue.reduce((sum, t) => sum + t.amount, 0);
    }, [expensesValue]);


    const dashboardStyle = {
        backgroundColor: theme?.theme === "dark" ? "#1e1e1e" : "#edf1f6ff",
        minHeight: "100vh",
        paddingTop: "20px"
    };

    return (
        <div style={dashboardStyle}>
            <div className="container mt-3">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-7 col-12">
                        <Form onAdd={addExpense} updateValue={updateValue} onUpdate={updateExpense} />
                    </div>

                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="shadow-sm p-3">
                            <ExpensesTotal expensesTotal={totalSpend} />
                        </div>
                    </div>
                </div>
            </div>


            {expensesValue.length === 0 ?
                <div className="alert alert-info text-center fw-bolder shadow-sm mt-2">
                    No Expense yet! Add a new Expenses to get started.
                </div> :
                expensesValue.map((item) => (
                    <ExpenseList key={item.id} items={item} onDelete={deleteExpense} onEdit={editExpense} />
                ))
            }
        </div>
    )
}

export default Dashboard;