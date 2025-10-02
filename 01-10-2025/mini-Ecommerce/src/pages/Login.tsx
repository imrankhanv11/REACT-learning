import type { RootState } from "../store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/registerForm";
import Profile from "./Profile";

const Login: React.FC = () => {
    const user = useSelector((state: RootState) => state.AuthStore.user);
    const [showRegister, setShowRegister] = useState<boolean>(true);

    if (user) {
        return (
            <Profile />
        )
    }

    return (
        <div>
            {showRegister ?
                <LoginForm setShowRegister={setShowRegister} />
                :
                <RegisterForm  setShowRegister={setShowRegister} />
            }
        </div>
    )
}

export default React.memo(Login);