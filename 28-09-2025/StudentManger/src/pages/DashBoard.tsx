import React, { type SetStateAction } from "react";
import { Button, Table, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { type StudentType } from "../types/studentsTypes";
import StudentList from "../components/StudentList";
import { type searchKeyColumnType } from "./Manager";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { useCallback, useMemo } from "react";

interface DashboardProbs {
    //Student Items
    students: StudentType[];

    //CRUD
    deleteStudent: (id: number) => void;
    setEditStudentItem: React.Dispatch<SetStateAction<StudentType | null>>;

    // Search
    setSearchKeyColumn: React.Dispatch<SetStateAction<searchKeyColumnType>>;
    searchKeyColumn: searchKeyColumnType;

    // Sort
    sortField: keyof StudentType | "";
    setSortField: React.Dispatch<SetStateAction<keyof StudentType | "">>;
    sortType: "ASC" | "DESC";
    setSortType: React.Dispatch<SetStateAction<"ASC" | "DESC">>

    // Dobrange
    setDobRange: React.Dispatch<SetStateAction<Date[]>>
    dobRange: Date[];

    // Enrolement Range
    enrolmentDateRange: Date[];
    setEnrolmentDate: React.Dispatch<SetStateAction<Date[]>>;
}

const Dashboard: React.FC<DashboardProbs> = ({
    students, deleteStudent, setEditStudentItem,
    setSearchKeyColumn, searchKeyColumn,
    sortField, setSortField, sortType, setSortType,
    setDobRange, dobRange,
    setEnrolmentDate, enrolmentDateRange
}) => {
    const navigater = useNavigate();

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

    const dateOfBirthRange = useMemo(() => {
        if (!dobRange[0] || !dobRange[1]) return finalStudents;

        const start = new Date(dobRange[0]).getTime();
        const end = new Date(dobRange[1]).getTime();

        return finalStudents.filter((student) => {
            if (!student.dateOfBirth) return false;
            const dob = new Date(student.dateOfBirth).getTime();
            return dob >= start && dob <= end;
        });
    }, [finalStudents, dobRange]);

    const enrollmentOfBirthRange = useMemo(() => {
        if (!enrolmentDateRange[0] || !enrolmentDateRange[1]) return dateOfBirthRange;

        const start = new Date(enrolmentDateRange[0]).getTime();
        const end = new Date(enrolmentDateRange[1]).getTime();

        return dateOfBirthRange.filter((student) => {
            if (!student.enrollmentDate) return false;
            const enroll = new Date(student.enrollmentDate).getTime();
            return enroll >= start && enroll <= end;
        });
    }, [dateOfBirthRange, enrolmentDateRange]);



    return (
        <div>
            <ToastContainer position="top-right" autoClose={2000} />
            <div>
                <Button variant="success" className=" m-2" onClick={() => navigater("/studentform")}>
                    Add Students
                </Button>
                <hr />

                <Container className=" d-flex gap-3 mb-2" style={{ width: "50%" }}>
                    <Form.Select
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value as keyof StudentType)}
                    >
                        <option value="">-- Sort By --</option>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                        <option value="dateOfBirth">Date of Birth</option>
                    </Form.Select>

                    <Form.Select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value as "ASC" | "DESC")}
                    >
                        <option value="ASC">Ascending Order</option>
                        <option value="DESC">Descending Order</option>
                    </Form.Select>

                    <Button variant="dark" className=" btn-sm" onClick={() => clearSoting()}>
                        Clear Sort
                    </Button>
                </Container>
                <Table responsive striped hover bordered>
                    <thead className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>Enrollment Date</th>
                            <th>Course</th>
                            <th>Mobil Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the Id"
                                    value={searchKeyColumn.id}
                                    onChange={e => setSearchKeyColumn(prev => (
                                        { ...prev, id: e.target.value }
                                    ))}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    disabled
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the name"
                                    value={searchKeyColumn.name}
                                    onChange={e => setSearchKeyColumn(prev => (
                                        { ...prev, name: e.target.value }
                                    ))}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the Email"
                                    value={searchKeyColumn.email}
                                    onChange={e => setSearchKeyColumn(prev => (
                                        { ...prev, email: e.target.value }
                                    ))}
                                />
                            </td>
                            <td>
                                <DatePicker
                                    selectsRange
                                    startDate={dobRange?.[0]}
                                    endDate={dobRange?.[1]}
                                    onChange={(dates) => setDobRange(dates as [Date, Date])}
                                    placeholderText="Select date range"
                                    dateFormat="dd-MM-yyyy"
                                    className=" form-control"
                                    isClearable
                                    showYearDropdown
                                    showMonthDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={70}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the Age"
                                    value={searchKeyColumn.age}
                                    onChange={e => setSearchKeyColumn(prev => (
                                        { ...prev, age: e.target.value }
                                    ))}
                                />
                            </td>
                            <td>
                                <DatePicker
                                    selectsRange
                                    startDate={enrolmentDateRange?.[0]}
                                    endDate={enrolmentDateRange?.[1]}
                                    onChange={(dates) => setEnrolmentDate(dates as [Date, Date])}
                                    placeholderText="Select date range"
                                    dateFormat="dd-MM-yyyy"
                                    className=" form-control"
                                    isClearable
                                    showYearDropdown
                                    showMonthDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={70}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the Course"
                                    value={searchKeyColumn.course}
                                    onChange={e => setSearchKeyColumn(prev => (
                                        { ...prev, course: e.target.value }
                                    ))}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    placeholder="Enter the Number"
                                    value={searchKeyColumn.phoneNumber}
                                    onChange={e => setSearchKeyColumn(prev => (
                                        { ...prev, phoneNumber: e.target.value }
                                    ))}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    placeholder="Enter the Status"
                                    value={searchKeyColumn.status}
                                    onChange={e => setSearchKeyColumn(prev => (
                                        { ...prev, status: e.target.value }
                                    ))}
                                />
                            </td>
                            <td className=" d-flex justify-content-center">
                                <Button variant="info" className=" btn-sm" onClick={() => clearSearch()}>
                                    Clear
                                </Button>
                            </td>
                        </tr>

                        {enrollmentOfBirthRange.length === 0 ?
                            <tr className="text-center" style={{ height: "100px" }} >
                                <td colSpan={11} className=" text-danger fw-bolder"><h4>No students found</h4></td>
                            </tr>
                            :
                            enrollmentOfBirthRange.map((student) => (
                                <StudentList
                                    key={student.id}
                                    student={student}
                                    deleteStudent={deleteStudent}
                                    setEditStudentItem={setEditStudentItem}
                                />
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default React.memo(Dashboard);