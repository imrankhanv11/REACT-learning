import React from "react";
import { useSelector } from "react-redux";
import type { RootState  } from "../app/store";
import { Table } from "react-bootstrap";
import StudentRow from "../components/studentRow";

const Dashboard: React.FC = () => {
  const students = useSelector((s: RootState) => s.students.list);
  
  return (
    <div>
      <h2 className="mb-4">Students Dashboard</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Category</th>
            <th>DOB</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center text-danger">
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <StudentRow key={s.id} item={s} />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default React.memo(Dashboard);
