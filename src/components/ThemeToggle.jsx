import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="btn btn-outline-primary"
      onClick={toggleTheme}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}