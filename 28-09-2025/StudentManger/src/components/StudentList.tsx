import type { StudentType } from "../types/studentsTypes";
import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../context/studentContext";

interface StudentListProbs {
    student: StudentType;
}

const StudentList: React.FC<StudentListProbs> = ({ student }) => {

    const navigater = useNavigate();

    const {setEditStudentItem, deleteStudent} = useStudentContext();

    const handleDownload = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const confirmDownload = window.confirm("Do you want to download this image?");
        if (confirmDownload) {
            const link = e.currentTarget;
            link.click();
        }
    };

    return (
        <tr>
            <td>{student.id}</td>
            <td className={`${student.photoUrl ? "" : "text-danger"}`}>
                {student.photoUrl && student.photoUrl.trim() !== "" ? (
                    <a
                        href={student.photoUrl}
                        download={`${student.name}.png`}
                        onClick={handleDownload}>
                        <img
                            src={student.photoUrl}
                            alt={`${student.name}'s photo`}
                            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "10%" }}
                        />
                    </a>
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