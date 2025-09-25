import React, { useCallback, useState, useMemo } from "react";
import StudentForm from "../componets/StudentForm";
import { type StudentItems } from "../types/StudentsTypes";
import StudentTable from "../componets/StudentTable";
import UseLocalStorage from "../customHooks/UseLocalStorage";


const StudentMan: React.FC = () => {

    console.log("Student home")

    const [studentItems, setStudentItems] = UseLocalStorage<StudentItems[]>("students", []);
    const [editStudent, setEditStudent] = useState<StudentItems | null>(null);

    const [sortField, setSortField] = useState<keyof StudentItems | "">("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const [searchField, setSearchField] = useState<string>("");

    // add
    const addStudent: (items: StudentItems) => void = useCallback((items: StudentItems) => {
        setStudentItems((prev) => [
            ...prev,
            {
                ...items,
                id: prev.length === 0 ? 1 : (prev[prev.length - 1].id ?? 0) + 1,
            },
        ]);

        // setStudentItems((prev) => [...prev, items]);
    }, [setStudentItems]);

    // delete
    const deleteStudent: (id: number) => void = useCallback(
        (id: number) => {
            setStudentItems((prev) =>
                prev.filter((item) => item.id !== id));
        },
        [setStudentItems]
    );

    // update
    const updateStudent: (item: StudentItems) => void = useCallback(
        (item: StudentItems) => {
            setStudentItems((prev) =>
                prev.map((t) => (t.id === item.id ? { ...t, ...item } : t))
            );
            setEditStudent(null);
        },
        [setStudentItems, setEditStudent]
    );

    // sorting
    // const sortedStudents = useMemo(() => {
    //     if (!sortField) return studentItems;

    //     return [...studentItems].sort((a, b) => {
    //         const valA = a[sortField];
    //         const valB = b[sortField];

    //         const factor = sortOrder === "asc" ? 1 : -1;

    //         // Date sorting
    //         if (valA instanceof Date && valB instanceof Date) {
    //             return (valA.getTime() - valB.getTime()) * factor;
    //         }

    //         // String sorting
    //         if (typeof valA === "string" && typeof valB === "string") {
    //             return valA.localeCompare(valB) * factor;
    //         }

    //         // Number sorting
    //         if (typeof valA === "number" && typeof valB === "number") {
    //             return (valA - valB) * factor;
    //         }

    //         return 0;
    //     });
    // }, [studentItems, sortField, sortOrder]);

    // searching
    // const filteredStudents = useMemo(() => {
    //     if (!searchField.trim()) return studentItems;

    //     const lower = searchField.toLowerCase();

    //     return studentItems.filter((student) => {
    //         return (
    //             student.name.toLowerCase().includes(lower) ||
    //             student.email.toLowerCase().includes(lower) ||
    //             student.country.toLowerCase().includes(lower) ||
    //             student.gender.toLowerCase().includes(lower) ||
    //             student.categories.some(cat => cat.toLowerCase().includes(lower))
    //         );
    //     });
    // }, [searchField, studentItems]);

    const finalStudents = useMemo(() => {
        let result = studentItems;
        if (searchField.trim()) {
            const lower = searchField.toLowerCase();
            result = result.filter((student) =>
                student.name.toLowerCase().includes(lower) ||
                student.email.toLowerCase().includes(lower) ||
                student.country.toLowerCase().includes(lower) ||
                student.gender.toLowerCase().includes(lower) ||
                student.categories.some(cat => cat.toLowerCase().includes(lower))
            );
        }

        if (sortField) {
            result = [...result].sort((a, b) => {
                const valA = a[sortField];
                const valB = b[sortField];
                const factor = sortOrder === "asc" ? 1 : -1;

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

        return result;
    }, [studentItems, searchField, sortField, sortOrder]);


    return (
        <div>
            <StudentForm onAdd={addStudent} editStudent={editStudent} onUpdate={updateStudent} />
            {studentItems.length === 0 ?
                <div className="alert alert-warning text-center fw-bolder shadow-sm mt-2 text-black">
                    No List yet! Add a new New need to get started.
                </div>
                :
                <StudentTable
                    //CRUD
                    onDelete={deleteStudent}
                    items={finalStudents} // Items
                    onEdit={setEditStudent}

                    // Sort
                    setSortField={setSortField}
                    sortField={sortField}

                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}

                    //Searching
                    searchField={searchField}
                    setSearchField={setSearchField}
                />}
        </div>
    )
}

export default StudentMan;