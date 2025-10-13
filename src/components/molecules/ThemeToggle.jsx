import { useEffect, useState } from "react";
import IconSun from "../../assets/icons/sun.svg";
import IconMoon from "../../assets/icons/moon.svg";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
      <img
        src={theme === "dark" ? IconMoon : IconSun}
        alt={theme === "dark" ? "icon moon" : "icon sun"}
        width="40"
        height="40"
        loading="lazy"
        className="fill-blue-500"
      />
    </div>
  );
}
