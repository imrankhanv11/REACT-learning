import React, { useState } from "react";
import NavBarLayout from "../layouts/NavBarLayout";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import StudentForm from "./StudentForm";
import { type StudentType } from "../types/studentsTypes";
import useLocalStorage from "../hooks/useLocalStorage";
import { useCallback, useMemo } from "react";
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

    //Clear search
    const clearSearch = useCallback(() => {
        setSearchKeyColumn({
            name: "",
            email: "",
            course: "",
            phoneNumber: "",
            status: "",
            age: "",
            id: ""
        })
    }, [setSearchKeyColumn]);

    //Clear sort
    const clearSoting = useCallback(() => {
        setSortField("");
        setSortType("ASC");
    }, [setSortField, setSortType]);

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


    //filter
    const searchItems = useMemo(() => {
        return students.filter(student => {
            return (
                (!searchKeyColumn.name || student.name.toLocaleLowerCase().includes(searchKeyColumn.name.toLocaleLowerCase()))
                &&
                (!searchKeyColumn.email || student.email.toLocaleLowerCase().includes(searchKeyColumn.email.toLocaleLowerCase()))
                &&
                (!searchKeyColumn.course || student.course.toLocaleLowerCase().includes(searchKeyColumn.course.toLocaleLowerCase()))
                &&
                (!searchKeyColumn.phoneNumber || student.phoneNumber.toLocaleLowerCase().includes(searchKeyColumn.phoneNumber.toLocaleLowerCase()))
                &&
                (!searchKeyColumn.status || student.status.toLocaleLowerCase().includes(searchKeyColumn.status.toLocaleLowerCase()))
                &&
                (!searchKeyColumn.age || student.age.toString().startsWith((searchKeyColumn.age)))
                &&
                (!searchKeyColumn.id || student.id.toString().startsWith((searchKeyColumn.id)))
            )
        })
    }, [students, searchKeyColumn]);

    //search with Sorting
    const finalStudents = useMemo(() => {

        let sortingResult: StudentType[] = searchItems

        if (sortField) {
            sortingResult = [...sortingResult].sort((a, b) => {
                const valA = a[sortField];
                const valB = b[sortField];
                const factor = sortType === "ASC" ? 1 : -1;

                if (valA instanceof Date && valB instanceof Date) {
                    return (valA.getTime() - valB.getTime()) * factor;
                }
                if (typeof valA === "string" && typeof valB === "string") {
                    return valA.localeCompare(valB) * factor;
                }
                if (typeof valA === "number" && typeof valB === "number") {
                    return (valA - valB) * factor;
                }
                return 0;
            });
        }

        return sortingResult;
    }, [searchItems, sortField, sortField, sortType]);

    //Dob Range
    const dateOfBirthRange = useMemo(() => {
        let dateOfBirthRangeResult: StudentType[] = finalStudents;

        if (dobRange[0] && dobRange[1]) {
            const data: StudentType[] = dateOfBirthRangeResult.filter((map) =>
                map.dateOfBirth ?
                    (
                        new Date(map.dateOfBirth).getFullYear() >= new Date(dobRange[0]).getFullYear()
                        &&
                        new Date(map.dateOfBirth).getMonth() >= new Date(dobRange[0]).getMonth()
                        &&
                        new Date(map.dateOfBirth).getDate() >= new Date(dobRange[0]).getDate()
                    )
                    &&
                    (
                        new Date(map.dateOfBirth).getFullYear() <= new Date(dobRange[1]).getFullYear()
                        &&
                        new Date(map.dateOfBirth).getMonth() <= new Date(dobRange[1]).getMonth()
                        &&
                        new Date(map.dateOfBirth).getDate() <= new Date(dobRange[1]).getDate()
                    )
                    : false);
            return data;
        }
        return dateOfBirthRangeResult;
    }, [finalStudents, dobRange]);

    //Enrollment Range
    const enrollmentOfBirthRange = useMemo(() => {
        let enrollmentResult: StudentType[] = dateOfBirthRange;

        if (enrolmentDateRange[0] && enrolmentDateRange[1]) {
            const data: StudentType[] = enrollmentResult.filter((map) =>
                map.enrollmentDate ?
                    (
                        new Date(map.enrollmentDate).getFullYear() >= new Date(enrolmentDateRange[0]).getFullYear()
                        &&
                        new Date(map.enrollmentDate).getMonth() >= new Date(enrolmentDateRange[0]).getMonth()
                        &&
                        new Date(map.enrollmentDate).getDate() >= new Date(enrolmentDateRange[0]).getDate()
                    )
                    &&
                    (
                        new Date(map.enrollmentDate).getFullYear() <= new Date(enrolmentDateRange[1]).getFullYear()
                        &&
                        new Date(map.enrollmentDate).getMonth() <= new Date(enrolmentDateRange[1]).getMonth()
                        &&
                        new Date(map.enrollmentDate).getDate() <= new Date(enrolmentDateRange[1]).getDate()
                    )
                    : false);
            return data;
        }
        return enrollmentResult;
    }, [dateOfBirthRange, enrolmentDateRange]);


    return (
        <div className=" d-flex flex-column min-vh-100">
            <NavBarLayout />
            <Routes>
                <Route path="/"
                    element={<DashBoard
                        students={enrollmentOfBirthRange}
                        deleteStudent={deleteStudent}
                        setEditStudentItem={setEditStudentItem}
                        clearSearch={clearSearch}
                        setSearchKeyColumn={setSearchKeyColumn}
                        searchKeyColumn={searchKeyColumn}

                        sortField={sortField}
                        setSortField={setSortField}

                        sortType={sortType}
                        setSortType={setSortType}

                        clearSoting={clearSoting}

                        // dob
                        setDobRange={setDobRange}
                        dobRange={dobRange}

                        // enrollment
                        setEnrolmentDate={setEnrokmentDate}
                        enrolmentDate={enrolmentDateRange}
                    />} />
                <Route path="/studentform" element={<StudentForm
                    onAddStudent={addNewStudent}
                    updateStudent={updateStudent}
                    editStudentItem={editStudentItem}
                />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <FooterLayout />
        </div>
    );
};

export default Manager;