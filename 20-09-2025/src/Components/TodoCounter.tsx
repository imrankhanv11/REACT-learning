import React from "react";

type TodoCounterProbs = {
    todoCompleted: number,
    todoPending: number
}

const TodoCounter: React.FC<TodoCounterProbs> = ({ todoCompleted, todoPending }) => {
    console.log("counter");
    return (
        <div className="mt-4 container d-flex justify-content-around counters">
            <div className="counter-box bg-success text-white p-3 rounded">
                <strong>Completed</strong>
                <p className="mb-0">{todoCompleted}</p>
            </div>
            <div className="counter-box bg-warning text-dark p-3 rounded">
                <strong>Pending</strong>
                <p className="mb-0">{todoPending}</p>
            </div>
        </div>
    );
};

export default React.memo(TodoCounter);