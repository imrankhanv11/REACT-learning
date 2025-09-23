import React, { createContext, useEffect, useState } from "react";
import type { theme, ThemeContextType } from "../types/theme";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<theme>("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as theme;

        if (savedTheme) {
            setTheme(savedTheme);
        }

        document.documentElement.setAttribute("data-theme", savedTheme || "light");

    }, []);

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === "light" ? "dark" : "light";

            localStorage.setItem("theme", newTheme);

            document.documentElement.setAttribute("data-theme", newTheme);

            return newTheme;
        })
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }} >
            {children}
        </ThemeContext.Provider>
    );
};