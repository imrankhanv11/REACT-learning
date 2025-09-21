import type React from "react";
import { useCallback, useMemo } from "react";
import UseLocalStorage from "../Hooks/UseLocalStorage";
import '../CSS/Todo.css'
import TodoItem from "../Components/TodoLists";
import TodoCounter from "../Components/TodoCounter";
import TodoForm from "../Components/TodoForm";
import { toast } from "react-toastify";

export type Todo = {
    id: number,
    todo: string,
    isCompleted: boolean
}

const Todo: React.FC = () => {

    const [todos, setTodo] = UseLocalStorage<Todo[]>("todo", []);

    // Add todo
    const addTodo = useCallback((value: string) => {
        const newTodo: Todo = {
            id: Date.now(), todo: value, isCompleted: false
        }
        setTodo(prev => [...prev, newTodo]);

        toast.success("Todo Added Sucessfully");

    }, [setTodo]);

    // Delete todo
    const deleteTodo = useCallback((id: number) => {
        setTodo((prev) => prev.filter((t) => t.id !== id));
        toast.error("Todo Deleted");
    }, [setTodo]);

    // CheckBox
    const toggleComplete = useCallback((id: number) => {
        setTodo((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
            )
        );
    }, [setTodo]);

    // Counters
    const completedCount = useMemo(() => todos.filter(t => t.isCompleted).length, [todos]);
    const pendingCount = useMemo(() => todos.length - completedCount, [todos, completedCount]);

    return (
        <div>
            <TodoForm addTodo={addTodo} />

            <TodoCounter todoCompleted={completedCount} todoPending={pendingCount} />

            {todos.map((item) => (
                <TodoItem key={item.id} todo={item} deleteTodo={deleteTodo} toggleTodo={toggleComplete} />
            ))}

        </div>

    )
}

export default Todo;