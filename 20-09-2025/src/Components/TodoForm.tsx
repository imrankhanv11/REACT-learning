import React from "react";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";

type TodoFormProbs = {
    addTodo: (value: string) => void;
}

const TodoForm: React.FC<TodoFormProbs> = ({ addTodo }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [titleValue, setInputValue] = useState<string>("");

    const [errors, setErrors] = useState<{
        title?: string
    }>({});

    const validateter = () => {
        const newErrors: typeof errors = {};

        if (!titleValue.trim()) {
            newErrors.title = "Title Can't be Empty";
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

        addTodo(titleValue);
        setInputValue("");

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
                                value={titleValue}
                                onChange={e => setInputValue(e.target.value)} />
                                {errors.title && <small className="text-danger">{errors.title}</small>}
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