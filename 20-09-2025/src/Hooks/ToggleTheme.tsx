import type React from "react";
import UseCustomHook from "./UseCustomHook";

const ToggleTheme: React.FC = () => {

    const [theme, setTheme] = UseCustomHook("theme", "light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div
            style={{
                backgroundColor: theme === "light" ? "white" : "black",
                color: theme === "light" ? "black" : "white",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                transition: "all 0.3s",
            }}
        >
            <h1>{theme === "light" ? "Light Mode" : "Dark Mode"}</h1>
            <button
                onClick={toggleTheme}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    borderRadius: "5px",
                }}
            >
                Toggle Theme
            </button>
        </div>
    );
}

export default ToggleTheme;