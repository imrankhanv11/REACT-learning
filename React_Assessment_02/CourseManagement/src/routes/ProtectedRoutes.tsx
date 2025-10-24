import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useDecodeToken from "../hooks/useDecodeToken";
import type { RootStateStore } from "../store/store";
import { Token } from "../common/enum/token";

interface ProtectedRoutesProbls {
    allowedRole: boolean;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProbls> = ({ allowedRole }) => {

    const userRole = useDecodeToken();
    console.log(typeof userRole);
    console.log(userRole);

    const isAuthenticated = useSelector((state: RootStateStore) => state.AuthStore.isAuthenticated);

    if (!userRole || !isAuthenticated) {
        return <Navigate to='/' replace />
    }

    try {

        if (allowedRole && userRole === "True") {
            return <Outlet />
        }

        if(!allowedRole && userRole === "False"){
            return <Outlet />
        }

        return <Navigate to='/' replace />;
    }
    catch (err: any) {
        localStorage.removeItem(Token.accessToken);
        localStorage.removeItem(Token.refreshToken);
        return <Navigate to='/login' replace />
    }
}

export default React.memo(ProtectedRoutes);