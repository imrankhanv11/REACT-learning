import React from "react";
import { Image, Button } from "react-bootstrap";
import type { Student } from "../types/studentTypes";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { deleteStudent, setEditStudent } from "../features/students/studentSlice";
import { useNavigate } from "react-router-dom";

interface StudentRowProbs {
    item: Student
}


const StudentRow: React.FC<StudentRowProbs> = ({ item }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.category?.join(", ")}</td>
            <td>{item.dob ? new Date(item.dob).toLocaleDateString() : ""}</td>
            <td>
                {item.image && (
                    <Image
                        src={item.image}
                        alt={item.name}
                        rounded
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                )}
            </td>
            <td className="d-flex gap-2 justify-content-around">
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(deleteStudent(item.id))}
                >
                    Delete
                </Button>

                <Button
                    variant="info"
                    size="sm"
                    onClick={() => {
                        dispatch(setEditStudent(item.id));
                        navigate("/form1");
                    }}
                >
                    Edit
                </Button>
            </td>
        </tr>
    )
}

export default React.memo(StudentRow);