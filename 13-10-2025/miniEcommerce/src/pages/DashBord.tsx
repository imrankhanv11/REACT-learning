import type { AppDispath } from "../store/app";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const DashBoard : React.FC = () =>{

    const dispatch = useDispatch<AppDispath>();
    const navigate = useNavigate();

    const logoutMethod = () =>{
        dispatch(logout());
        navigate('/');
    }
    
    return(
        <div>
            <button onClick={() => logoutMethod()}>logout</button>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}

export default React.memo(DashBoard);