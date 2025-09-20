import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1f3d6aff" }}>
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    Hooks
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/useref">
                                UseRef
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/usememo">
                                UseMemo
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/usecallback">
                                UseCallback
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/toggle">
                                Toggle
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/todo">
                                Todo
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
