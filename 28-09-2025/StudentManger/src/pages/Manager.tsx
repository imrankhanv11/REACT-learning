import React, { useState } from "react";
import NavBarLayout from "../layouts/NavBarLayout";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import StudentForm from "./StudentForm";
import { type StudentType } from "../types/studentsTypes";
import useLocalStorage from "../hooks/useLocalStorage";
import { useCallback } from "react";
import FooterLayout from "../layouts/FooterLayout";
import NotFoundPage from "./NotFoundPage";
import { toast } from "react-toastify";

export interface searchKeyColumnType {
    id: string,
    name: string,
    email: string,
    course: string,
    phoneNumber: string,
    status: string,
    age: string
}

const Manager: React.FC = () => {
    // Student Details store in Local Storange
    const [students, setStudents] = useLocalStorage<StudentType[]>("studentsList", []);

    // editing details store in Local Storage
    const [editStudentItem, setEditStudentItem] = useLocalStorage<StudentType | null>("edit", null);

    // searching state
    const [searchKeyColumn, setSearchKeyColumn] = useState<searchKeyColumnType>({
        name: "",
        email: "",
        course: "",
        phoneNumber: "",
        status: "",
        age: "",
        id: ""
    });

    // sorting state
    const [sortField, setSortField] = useState<keyof StudentType | "">("");
    const [sortType, setSortType] = useState<"ASC" | "DESC">("ASC");

    // Date of Birth
    const [dobRange, setDobRange] = useState<Date[]>([]);

    // Entrolment Date
    const [enrolmentDateRange, setEnrokmentDate] = useState<Date[]>([]);

    // check student Email exits
    const checkEmailExits = useCallback((email: string) => {
        const emailExists = students.some(student => student.email === email);

        if (emailExists) {
           return true;
        }else{
            return true;
        }

    }, [students]);

    // addStudent
    const addNewStudent = useCallback((items: StudentType) => {
        setStudents((prev) => [...prev, {
            ...items,
            id: prev.length === 0 ? 1 : (prev[prev.length - 1].id ?? 0) + 1,
        },
        ]);

        toast.success("New Student Added Sucessfully");
    }, [setStudents]);

    //deleteStudent
    const deleteStudent = useCallback((id: number) => {

        if (!confirm("Do you want to Delete ?")) {
            return;
        }
        setStudents((prev) =>
            prev.filter((student) => student.id !== id));

        toast.error("Student Deleted Succesfully");

    }, [setStudents])

    // updateStudent
    const updateStudent = useCallback(
        (item: StudentType) => {
            setStudents((prev) =>
                prev.map((t) => (t.id === item.id ? { ...t, ...item } : t))
            );
            setEditStudentItem(null);

            toast("Updated Succesfully");
        },
        [setStudents, setEditStudentItem]
    );

    return (
        <div className=" d-flex flex-column min-vh-100">
            <NavBarLayout />
            <Routes>
                <Route path="/"
                    element={<DashBoard
                        students={students}
                        deleteStudent={deleteStudent}
                        setEditStudentItem={setEditStudentItem}
                        setSearchKeyColumn={setSearchKeyColumn}
                        searchKeyColumn={searchKeyColumn}

                        sortField={sortField}
                        setSortField={setSortField}

                        sortType={sortType}
                        setSortType={setSortType}

                        // dob
                        setDobRange={setDobRange}
                        dobRange={dobRange}

                        // enrollment
                        setEnrolmentDate={setEnrokmentDate}
                        enrolmentDateRange={enrolmentDateRange}
                    />} />

                <Route path="/studentform"
                    element={<StudentForm
                        onAddStudent={addNewStudent}
                        updateStudent={updateStudent}
                        editStudentItem={editStudentItem}

                        checkEmailExits={checkEmailExits}
                    />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <FooterLayout />
        </div>
    );
};

export default Manager;