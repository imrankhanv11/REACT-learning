import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home"
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import Books from "../pages/Books";
import AddBooks from "../pages/AddBooks";
import NotFound from "../pages/NotFound";
import Practice from "../pages/Practice";

const RoutersPage: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/practice" element={<Practice />} />

            <Route element={<PrivateRoutes allowedRoles={["Admin"]} />} >
                <Route path="/addBook" element={<AddBooks />} />
            </Route>

            <Route element={<PrivateRoutes allowedRoles={["Admin", "User"]} />} >
                <Route path="/books" element={<Books />} />
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
};

export default RoutersPage;
