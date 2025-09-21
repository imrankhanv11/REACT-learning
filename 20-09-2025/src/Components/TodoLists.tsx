import React from "react";
import { type Todo } from "../Pages/Todo";
type TodoItemProps = {
    todo: Todo,
    deleteTodo: (id: number) => void,
    toggleTodo: (id: number) => void
};

const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo, deleteTodo, toggleTodo }) => {
    console.log("listitems");
    return (
        <li className="list-group-item d-flex align-items-center justify-content-between mb-2 w-100 mx-auto mt-3 p-3"
            style={{ maxWidth: "600px" }}>
            <div className="form-check d-flex align-items-center gap-2 flex-grow-1">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`}
                />
                <label
                    className={`form-check-label ${todo.isCompleted ? "text-decoration-line-through text-muted" : ""}`}
                    htmlFor={`todo-${todo.id}`}
                >
                    {todo.todo}
                </label>
            </div>
            <button
                className="btn btn-sm btn-danger ms-3"
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        </li>
    );
});


export default TodoItem;