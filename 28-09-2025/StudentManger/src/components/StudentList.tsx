import type { SetStateAction } from "react";
import type { StudentType } from "../types/studentsTypes";
import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

interface StudentListProbs {
    student: StudentType;
    deleteStudent: (id: number) => void;
    setEditStudentItem: React.Dispatch<SetStateAction<StudentType | null>>;
}

const StudentList: React.FC<StudentListProbs> = ({ student, deleteStudent, setEditStudentItem }) => {

    const navigater = useNavigate();
    return (
        <tr>
            <td>{student.id}</td>
            <td className={`${student.photoUrl? "" : "text-danger"}`}>
                {student.photoUrl && student.photoUrl.trim() !== "" ? (
                    <img
                        src={student.photoUrl}
                        alt={`${student.name}'s photo`}
                        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "10%" }}
                    />
                ) : (
                    "No Photo"
                )}

            </td>

            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.dateOfBirth ? new Date(student.dateOfBirth).toDateString() : ""}</td>
            <td>{student.age}</td>
            <td className={`${student.enrollmentDate ? "" : "text-danger"}`}>{student.enrollmentDate ? new Date(student.enrollmentDate).toDateString() : "Not Found"}</td>
            <td>{student.course}</td>
            <td>{student.phoneNumber}</td>
            <td className={`${student.status === "Active" ? "text-success" : "text-danger"}`}>{student.status}</td>
            <td className=" d-flex gap-1 justify-content-around">
                <Button variant="info" className=" btn-sm" onClick={() => {
                    setEditStudentItem(student);
                    navigater("/studentform");
                }} >
                    Edit
                </Button>
                <Button variant="danger" className=" btn-sm" onClick={() => deleteStudent(student.id)}>
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default React.memo(StudentList);