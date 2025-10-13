import React, { useState } from "react";
import LoginForm from "../components/LoginFrom";
import RegisterForm from "../components/RegisterForm";
import { useSelector } from "react-redux";
import type { RootState } from "../store/app";
import { Navigate } from "react-router-dom";

const AuthPage: React.FC = () => {
    const [showLogin, setShowLogin] = useState<boolean>(true);

    const { isAuthenticated } = useSelector((state: RootState) => state.AuthStore);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-5" style={{ maxWidth: 450 }}>
            {showLogin ? (
                <LoginForm setShowLogin={setShowLogin} />
            ) : (
                <RegisterForm setShowLogin={setShowLogin} />
            )}
        </div>
    );
};

export default React.memo(AuthPage);
