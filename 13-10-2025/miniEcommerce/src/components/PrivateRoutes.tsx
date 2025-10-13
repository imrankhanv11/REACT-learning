import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { RootState } from "../store/app";

interface PrivateRoutesProps {
    children: React.ReactNode;
    allowedRoles: ("User" | "Admin")[];
}

interface DecodedToken {
    nameid: string;

    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: "User" | "Admin";
    role?: "User" | "Admin";

    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
    name: string;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children, allowedRoles }) => {
    const isAuthenticated = useSelector((state: RootState) => state.AuthStore.isAuthenticated);
    const location = useLocation();

    const lsToken = localStorage.getItem("access_token");

    if (!lsToken || !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        const decoded = jwtDecode<DecodedToken>(lsToken);

        const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const userName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.name;

        console.log(userRole, userName);

        if (!userRole) {
            return <Navigate to="/login" replace />;
        }

        if (!allowedRoles.includes(userRole)) {
            if (userRole === "Admin") {
                return <Navigate to="/admin/dashboard" replace />;
            } else if (userRole === "User") {
                return <Navigate to="/dashboard" replace />;
            } else {
                return <Navigate to="/" replace />;
            }
        }

        return <>{children}</>;

    } catch (error) {
        localStorage.removeItem("access_token");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default React.memo(PrivateRoutes);