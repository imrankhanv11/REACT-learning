import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface FormProps {
    onAdd: (Book: string, description: string, email: string, gender: string, Hobbies: string[], department: string) => void;
}

const Form: React.FC<FormProps> = ({ onAdd }) => {
    const inputref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputref.current?.focus();
    }, []);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [hobbies, setHobbies] = useState<string[]>([]);

    const handleCheckboxChange = (value: string) => {
        setHobbies(prev =>
            prev.includes(value)
                ? prev.filter(hobby => hobby !== value)
                : [...prev, value]
        );
    };

    const [errors, setErrors] = useState<{
        title?: string;
        description?: string;
        email?: string;
        department?: string;
        gender?: string;
        hobbies?: string;
    }>({});

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!title.trim()) {
            newErrors.title = "Name can't be empty";
        } else if (title.length < 3) {
            newErrors.title = "Name must be at least 3 characters";
        }

        if (!description.trim()) {
            newErrors.description = "Description is required";
        }
        else if (description.length < 4) {
            newErrors.description = "Description must be at least 4 characters"
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email format is invalid";
        }

        if (!department.trim()) {
            newErrors.department = "Please select a department";
        }

        if (!gender.trim()) {
            newErrors.gender = "Please select your gender";
        }

        if (hobbies.length === 0) {
            newErrors.hobbies = "Please select at least one hobby";
        }

        return newErrors;
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors: typeof errors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please Fix the error before summiting");
            return;
        }

        setErrors({});

        onAdd(title.trim(), description.trim(), email.trim(), gender, hobbies, department);

        setTitle("");
        setDescription("");
        setEmail("");
        setDepartment("");
        setGender("");
        setHobbies([]);

        toast.success("Added new List Succesfully");
    }

    return (
        <form onSubmit={handleSubmit} className="mb-2 container mt-3">
            <h3 className="mb-3">Add Item</h3>
            <div className="mb-3">
                <label className="form-label" htmlFor="title">Name:</label>
                <input
                    type="text"
                    className="form-control w-50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ref={inputref}
                    id="title" />
                {errors.title && <div className="text-danger">{errors.title}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="Description">Description:</label>
                <input
                    type="text"
                    className="form-control w-50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="Description" />
                {errors.description && <div className="text-danger">{errors.description}</div>}
            </div>
            <div className="mb-3">
                <label className=" form-label" htmlFor="Email">Email:</label>
                <input type="email"
                    className="w-50 form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="Email"
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="department">Department:</label>
                <select
                    id="department"
                    name="department"
                    className="form-select w-50"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value="">Select Department</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                </select>
                {errors.department && <div className="text-danger">{errors.department}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label d-block">Gender:</label>

                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="male">
                        Male
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="female">
                        Female
                    </label>
                </div>
                {errors.gender && <div className="text-danger">{errors.gender}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label d-block">Hobbies:</label>

                <div className="form-check form-check-inline">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="reading"
                        value="Reading"
                        checked={hobbies.includes("Reading")}
                        onChange={() => handleCheckboxChange("Reading")}
                    />
                    <label className="form-check-label" htmlFor="reading">Reading</label>
                </div>

                <div className="form-check form-check-inline">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="sports"
                        value="Sports"
                        checked={hobbies.includes("Sports")}
                        onChange={() => handleCheckboxChange("Sports")}
                    />
                    <label className="form-check-label" htmlFor="sports">Sports</label>
                </div>

                <div className="form-check form-check-inline">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="music"
                        value="Music"
                        checked={hobbies.includes("Music")}
                        onChange={() => handleCheckboxChange("Music")}
                    />
                    <label className="form-check-label" htmlFor="music">Music</label>
                </div>
                {errors.hobbies && <div className="text-danger">{errors.hobbies}</div>}
            </div>

            <div>
                <button type="submit" className="btn btn-dark w-25">Add</button>
            </div>
        </form>
    );
}

export default Form;