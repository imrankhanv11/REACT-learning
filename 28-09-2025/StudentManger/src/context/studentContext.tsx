import React, { createContext, useContext, useCallback, useState } from "react";
import { type StudentType } from "../types/studentsTypes";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

export interface searchKeyColumnType {
    id: string;
    name: string;
    email: string;
    course: string;
    phoneNumber: string;
    status: string;
    age: string;
}

interface StudentContextType {
    // Student Data
    students: StudentType[];
    editStudentItem: StudentType | null;
    setEditStudentItem: (item: StudentType | null) => void;

    // CRUD
    addStudent: (item: StudentType) => void;
    updateStudent: (item: StudentType) => void;
    deleteStudent: (id: number) => void;

    // Search
    searchKeyColumn: searchKeyColumnType;
    setSearchKeyColumn: React.Dispatch<React.SetStateAction<searchKeyColumnType>>;

    // Sort
    sortField: keyof StudentType | "";
    setSortField: React.Dispatch<React.SetStateAction<keyof StudentType | "">>;
    sortType: "ASC" | "DESC";
    setSortType: React.Dispatch<React.SetStateAction<"ASC" | "DESC">>;

    // Date Ranges
    dobRange: Date[];
    setDobRange: React.Dispatch<React.SetStateAction<Date[]>>;
    enrolmentDateRange: Date[];
    setEnrolmentDate: React.Dispatch<React.SetStateAction<Date[]>>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Students
    const [students, setStudents] = useLocalStorage<StudentType[]>("studentsList", []);
    const [editStudentItem, setEditStudentItem] = useLocalStorage<StudentType | null>("edit", null);

    // Search
    const [searchKeyColumn, setSearchKeyColumn] = useState<searchKeyColumnType>({
        id: "",
        name: "",
        email: "",
        course: "",
        phoneNumber: "",
        status: "",
        age: ""
    });

    // Sort
    const [sortField, setSortField] = useState<keyof StudentType | "">("");
    const [sortType, setSortType] = useState<"ASC" | "DESC">("ASC");

    // Date ranges
    const [dobRange, setDobRange] = useState<Date[]>([]);
    const [enrolmentDateRange, setEnrolmentDate] = useState<Date[]>([]);

    // CRUD functions
    const addStudent = useCallback((item: StudentType) => {
        setStudents((prev) => [
            ...prev,
            { ...item, id: prev.length === 0 ? 1 : (prev[prev.length - 1].id ?? 0) + 1 }
        ]);
        toast.success("New Student Added Successfully");
    }, [setStudents]);

    const updateStudent = useCallback((item: StudentType) => {
        setStudents((prev) =>
            prev.map((t) => (t.id === item.id ? { ...t, ...item } : t))
        );
        setEditStudentItem(null);
        toast.info("Student Updated Successfully");
    }, [setStudents, setEditStudentItem]);

    const deleteStudent = useCallback((id: number) => {
        if (!confirm("Do you want to delete?")) return;
        setStudents((prev) => prev.filter((s) => s.id !== id));
        toast.error("Student Deleted Successfully");
    }, [setStudents]);

    return (
        <StudentContext.Provider
            value={{
                students,
                editStudentItem,
                setEditStudentItem,
                addStudent,
                updateStudent,
                deleteStudent,
                searchKeyColumn,
                setSearchKeyColumn,
                sortField,
                setSortField,
                sortType,
                setSortType,
                dobRange,
                setDobRange,
                enrolmentDateRange,
                setEnrolmentDate
            }}
        >
            {children}
        </StudentContext.Provider>
    );
};

// Custom hook to use context
export const useStudentContext = () => {
    const context = useContext(StudentContext);
    if (!context) throw new Error("useStudentContext must be used within StudentProvider");
    return context;
};
