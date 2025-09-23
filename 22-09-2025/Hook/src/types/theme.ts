export type theme = "light" | "dark";

export interface ThemeContextType  {
    theme: theme,
    toggleTheme : () => void;
}