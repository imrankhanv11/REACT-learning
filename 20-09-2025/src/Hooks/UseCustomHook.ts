import { useEffect, useState } from "react";

function UseCustomHook(theme: string, ininialTheme: string) {
    const [themeValue, setThemeValue] = useState(() => {

        const item = localStorage.getItem(theme);

        return item ? item : ininialTheme;
    });

    useEffect(() => {
        localStorage.setItem(theme, themeValue);
    }, [theme, themeValue]);

    return [themeValue, setThemeValue] as const;
}

export default UseCustomHook;