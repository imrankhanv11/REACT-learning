import React, { useContext } from "react";
import { ThemeContext } from "../context/themContext";
import { Button } from "react-bootstrap";

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button variant={theme === "dark" ? "light" : "dark"} onClick={toggleTheme}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
    );
};

export default ThemeToggle;
