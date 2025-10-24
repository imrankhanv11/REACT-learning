import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Books from "../pages/Books";
import Login from "../pages/Login";
import Categories from "../pages/Categories";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../pages/profile";
import AddBooks from "../pages/AddBooks";

const RoutesPages: React.FC = () => {
    return (
        <Routes>
            {/* public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login />} />

            {/* protected Routes */}
            <Route element={<ProtectedRoutes allowedRoles={["Admin", "SPAdmin"]} />} >
                <Route path="/categories" element={<Categories />} />
                <Route path="/addproducts" element={<AddBooks />} />
            </Route>

            <Route element={<ProtectedRoutes allowedRoles={["User", "SPAdmin", "Admin"]} />} >
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default React.memo(RoutesPages);