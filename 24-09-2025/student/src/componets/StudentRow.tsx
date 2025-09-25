import React from "react";
import { type StudentItems } from "../types/StudentsTypes";
import { Button } from "react-bootstrap";

interface StudentRowProbs {
    student: StudentItems,
    onDelete: (id: number) => void;
    onEdit: React.Dispatch<React.SetStateAction<StudentItems | null>>
}

const StudentRow: React.FC<StudentRowProbs> = ({ student, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.gender}</td>
            <td>{student.categories.join(", ")}</td>
            <td>{student.mobile}</td>
            <td>{student.birthDate ? new Date(student.birthDate).toDateString() : ""}</td>
            <td>{student.country}</td>
            <td>{student.rating}</td>
            <td>
                {student.duration[0] && student.duration[1]
                    ? `${new Date(student.duration[0]).toDateString()} - ${new Date(student.duration[1]).toDateString()}`
                    : ""}
            </td>

            <td className=" text-center d-flex gap-1 justify-content-center">
                <Button variant="danger" size="sm" onClick={() => onDelete(student.id)}>
                    Delete
                </Button>
                <Button variant="info" size="sm" onClick={() => onEdit(student)}>
                    Edit
                </Button>
            </td>
        </tr>
    )
}

export default React.memo(StudentRow);