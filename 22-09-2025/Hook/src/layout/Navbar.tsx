import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";

const Navbar = () => {
    const theme = useContext(ThemeContext);

    const dashboardStyle: React.CSSProperties = {
        backgroundColor: theme?.theme === "dark" ? "#1e1e1e" : "#edf1f6",
        color: theme?.theme === "dark" ? "#edf1f6" : "#1e1e1e"
    };

    const navThemeClass = theme?.theme === "dark" ? "navbar-dark" : "navbar-light";

    return (
        <nav
            className={`navbar navbar-expand-lg mb-sm-1 ${navThemeClass}`}
            style={dashboardStyle}
        >
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    ExpenseTracker
                </NavLink>

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
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/categories"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Categories
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/transactions"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                Transactions
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <div className=" nav-link">
                                <button className="btn btn-dark btn-sm" onClick={theme?.toggleTheme}>
                                    {theme?.theme === "dark"? "Light" : "Dark"}
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
