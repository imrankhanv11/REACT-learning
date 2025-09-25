import React from "react";
import { type StudentItems } from "../types/StudentsTypes";
import { Table, Form } from "react-bootstrap";
import StudentRow from "./StudentRow";

interface StudentTableProbs {
    onDelete: (id: number) => void;
    items: StudentItems[],
    onEdit: React.Dispatch<React.SetStateAction<StudentItems | null>>;

    setSortField: React.Dispatch<React.SetStateAction<keyof StudentItems | "">>;
    sortField: keyof StudentItems | "";

    sortOrder: "asc" | "desc";
    setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>

    searchField: string;
    setSearchField: React.Dispatch<React.SetStateAction<string>>
}

const StudentTable: React.FC<StudentTableProbs> = ({ onDelete, items, onEdit, setSortField, sortField, setSortOrder, sortOrder, searchField, setSearchField }) => {
    return (
        <div>
            <div className="d-flex gap-2 mb-3">
                <Form.Select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as keyof StudentItems)}
                    style={{ maxWidth: "200px" }}
                >
                    <option value="">-- Sort By --</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="gender">Gender</option>
                    <option value="mobile">Mobile</option>
                    <option value="birthDate">Birth Date</option>
                    <option value="country">Country</option>
                    <option value="rating">Rating</option>
                </Form.Select>

                <Form.Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                    style={{ maxWidth: "150px" }}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </Form.Select>
            </div>
            <div className="d-flex gap-2 mb-3">
                <Form className="mb-3 text-center">
                    <Form.Control
                        type="text"
                        placeholder="Search by name, email, country..."
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                        style={{ maxWidth: "300px", margin: "0 auto" }}
                    />
                </Form>

            </div>

            <Table striped bordered hover responsive>
                <thead className=" text-center">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Categories</th>
                        <th>Mobile</th>
                        <th>Birth Date</th>
                        <th>Country</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((student) => (
                        <StudentRow key={student.id} student={student} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default React.memo(StudentTable);