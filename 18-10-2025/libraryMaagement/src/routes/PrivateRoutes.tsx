import React from "react";
import { useDecodeToken } from "../hooks/useDecodeToken";
import { Navigate, Outlet } from "react-router-dom";

interface IPrivateRoutesProbs{
    allowedRoles : ("Admin"|"User")[]
}

const PrivateRoutes: React.FC<IPrivateRoutesProbs> = ({allowedRoles}) =>{
    
    const role = useDecodeToken();

    if(!role){
        return <Navigate to="/" replace />
    }

    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" replace />

}

export default React.memo(PrivateRoutes);