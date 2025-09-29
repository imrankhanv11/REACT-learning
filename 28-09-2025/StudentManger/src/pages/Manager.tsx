import React from "react";
import NavBarLayout from "../layouts/NavBarLayout";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import StudentForm from "./StudentForm";
import FooterLayout from "../layouts/FooterLayout";
import NotFoundPage from "./NotFoundPage";
import { StudentProvider } from "../context/studentContext";

const Manager: React.FC = () => {

    return (
        <div className=" d-flex flex-column min-vh-100">
            <NavBarLayout />
            <StudentProvider>
                <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/studentform" element={<StudentForm />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </StudentProvider>
            <FooterLayout />
        </div>
    );
};

export default Manager;