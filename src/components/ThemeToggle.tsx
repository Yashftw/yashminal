import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Initialize dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="interactive border-2 border-border bg-card px-3 py-1.5 font-pixel text-[9px] tracking-wider text-primary hover:bg-accent transition-all panel-glow"
      aria-label="Toggle theme"
    >
      {dark ? "☀ LIGHT" : "☾ DARK"}
    </button>
  );
};

export default ThemeToggle;
