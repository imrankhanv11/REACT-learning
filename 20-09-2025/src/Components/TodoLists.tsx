import React from "react";
import { type Todo } from "../types/todo";

type TodoItemProps = {
    todo: Todo,
    deleteTodo: (id: number) => void,
    toggleTodo: (id: number) => void
};

const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo, deleteTodo, toggleTodo }) => {
    console.log("listitems");
    return (
        <li
            className="list-group-item d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-3 w-100 mx-auto p-3 rounded shadow-sm mt-2"
            style={{ maxWidth: "600px" }}
        >
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 flex-grow-1">
                <input
                    className="form-check-input mt-1"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`}
                />
                <div className="ms-2">
                    <label
                        className={`form-check-label fw-semibold ${todo.isCompleted ? "text-decoration-line-through text-muted" : ""}`}
                        htmlFor={`todo-${todo.id}`}
                    >
                        {todo.todo}
                    </label>
                    <p className="mb-0 text-muted small">{todo.description}</p>

                </div>
            </div>
            <button
                className="btn btn-sm btn-danger mt-2 mt-md-0"
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        </li>

    );
});


export default TodoItem;