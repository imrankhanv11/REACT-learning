import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

type ExpensesTotalProbs = {
    expensesTotal: number
}

const ExpensesTotal: React.FC<ExpensesTotalProbs> = ({ expensesTotal }) => {

    console.log("Expenses");

    const theme = useContext(ThemeContext);

    const Card: React.CSSProperties = {
        backgroundColor: theme?.theme === "dark" ? "#1e1e1e" : "#edf1f6",
        color: theme?.theme === "dark" ? "#edf1f6" : "#1e1e1e"
    }

    return (
        <div className=" card border rounded-2" style={Card}>
            <div className=" card-header">
                Total Expenses
            </div>
            <div className="card-body d-flex align-items-center gap-2">
                <h1 className="text-danger mb-0">{expensesTotal}</h1>
                <h4 className="mb-0">Rs/-</h4>
            </div>

        </div>
    );
};

export default React.memo(ExpensesTotal);