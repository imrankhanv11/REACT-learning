import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import type { AppDispathStore } from "../store/store";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {

    const dispatch = useDispatch<AppDispathStore>();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logout());
        navigate("/");
    }

    return (
        <div>
            <Button onClick={() => logoutUser()}>Logout</Button>
        </div>
    )
}

export default React.memo(Profile);