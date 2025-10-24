import React from "react";
import { token } from "../commons/enums/TokenStorage";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import useDecodeToken from "../hooks/useDecodeToken";

interface ProtectedRoutesProbls {
    allowedRoles: ("User" | "Admin" | "SPAdmin")[];
}

const ProtectedRoutes: React.FC<ProtectedRoutesProbls> = ({ allowedRoles }) => {

    const userRole = useDecodeToken();

    const isAuthenticated = useSelector((state: RootState) => state.AuthStore.isAutheticated);

    if (!userRole || !isAuthenticated) {
        return <Navigate to='/login' replace />
    }

    try {
        return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to='/login' replace />;
    }
    catch (err: any) {
        localStorage.removeItem(token.accessTokenLC);
        localStorage.removeItem(token.refreshTokenLC);
        return <Navigate to='/login' replace />
    }
}

export default React.memo(ProtectedRoutes);