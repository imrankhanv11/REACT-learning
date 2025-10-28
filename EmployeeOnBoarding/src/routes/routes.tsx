import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeOnBoard from "../pages/EmployeeOnBoard";

const RoutesPages: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<EmployeeOnBoard />} />
        </Routes>
    )
}

export default React.memo(RoutesPages);