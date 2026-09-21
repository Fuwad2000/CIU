"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  applyAdminTheme,
  persistAdminTheme,
  readStoredAdminTheme,
  type AdminTheme,
} from "@frontend/portal/admin-theme";

export default function AdminThemeToggle() {
  const [theme, setTheme] = useState<AdminTheme>("light");

  useEffect(() => {
    const next = readStoredAdminTheme();
    setTheme(next);
    applyAdminTheme(next);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    persistAdminTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-background hover:text-foreground"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
}
