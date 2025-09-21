import React from "react";
import { useRef, useEffect, useState, useReducer } from "react";
import { toast } from "react-toastify";
import { todoFormReducer } from "../reducers/todoReducers";

type TodoFormProbs = {
    addTodo: (todo: string, description: string) => void;
}

const TodoForm: React.FC<TodoFormProbs> = ({ addTodo }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [state, dispatch] = useReducer(todoFormReducer, { title: "", description: "" });

    const [errors, setErrors] = useState<{
        title?: string,
        description?: string
    }>({});

    const validateter = () => {
        const newErrors: typeof errors = {};

        if (!state.title.trim()) {
            newErrors.title = "Title Can't be Empty";
        }
        else if (state.title.trim().length >= 20) {
            newErrors.title = "Tilte can't be More than 20 Char"
        }

        if (!state.description.trim()) {
            newErrors.description = "Description Can't be Empty"
        }

        return newErrors;
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Form
    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validations: typeof errors = validateter();

        if (Object.keys(validations).length > 0) {
            setErrors(validations);
            toast.error("Please Fix the error before summit the Form");
            return;
        }

        setErrors({});

        addTodo(state.title, state.description);

        dispatch({ type: "RESET" });


        inputRef.current?.focus();
    }

    console.log("Form");
    return (
        <div>
            <form className="container-md mt-2 d-flex justify-content-around" onSubmit={formSubmit}>
                <div className="container-own">
                    <div>
                        <div>
                            <label htmlFor="title" className=" form-label">Title</label>
                            <input type="text" id="title" className=" form-control w-100"
                                placeholder="Enter the new task" ref={inputRef}
                                value={state.title}
                                onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })} />
                            {errors.title && <small className="text-danger">{errors.title}</small>}
                        </div>
                        <div className=" mt-2">
                            <label className=" form-label">Description</label>
                            <textarea name="description" id="des" className=" form-control"
                                value={state.description}
                                onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })}
                                rows={3}              
                                style={{ resize: "none" }} 
                                placeholder="Enter a short description" />
                                {errors.description && <small className=" text-danger">{errors.description}</small>}
                        </div>
                        <div className="mt-2">
                            <button className="btn btn-success">Add</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default React.memo(TodoForm);