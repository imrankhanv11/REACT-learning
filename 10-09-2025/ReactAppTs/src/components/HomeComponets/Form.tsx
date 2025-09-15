import React, { useEffect, useRef, useState } from "react";

interface FormProps {
    onAdd: (Book: string, description: string) => void;
}

const Form: React.FC<FormProps> = ({ onAdd }) => {
    const inputref = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        inputref.current?.focus();
    },[]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) return;

        onAdd(title.trim(), description.trim());

        setTitle("");
        setDescription("");
    }

    return (
        <form onSubmit={handleSubmit} className="mb-2 container mt-3">
            <h3 className="mb-3">Add Item</h3>
            <div className="mb-3">
                <label className="form-label">Title:</label>
                <input
                    type="text"
                    className="form-control w-50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    ref={inputref} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description:</label>
                <input
                    type="text"
                    className="form-control w-50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <button type="submit" className="btn btn-dark w-25">Add</button>
            </div>
        </form>
    );
}

export default Form;