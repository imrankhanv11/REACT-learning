import React from "react";
import { Image, Button } from "react-bootstrap";
import type { Student } from "../types/studentTypes";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { deleteStudent } from "../features/students/studentSlice";

interface StudentRowProbs {
    item: Student
}


const StudentRow: React.FC<StudentRowProbs> = ({ item }) => {

    const dispatch = useDispatch<AppDispatch>();

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
            <td>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(deleteStudent(item.id))}
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
}

export default React.memo(StudentRow);