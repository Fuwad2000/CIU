"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  persistAdminTheme,
  readStoredAdminTheme,
  type AdminTheme,
} from "@frontend/portal/admin-theme";

const options: { value: AdminTheme; label: string; description: string; icon: typeof Sun }[] = [
  {
    value: "light",
    label: "Light",
    description: "A bright workspace for daytime use.",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "A dimmer workspace that’s easier on the eyes at night.",
    icon: Moon,
  },
];

export default function AdminThemePicker() {
  const [theme, setTheme] = useState<AdminTheme>("light");

  useEffect(() => {
    setTheme(readStoredAdminTheme());
  }, []);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const selected = theme === option.value;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setTheme(option.value);
              persistAdminTheme(option.value);
            }}
            className={`rounded-2xl border px-4 py-5 text-left transition ${
              selected
                ? "border-brand bg-brand/10 shadow-sm"
                : "border-border bg-background hover:border-brand/30"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">{option.label}</p>
            <p className="mt-1 text-sm text-muted">{option.description}</p>
          </button>
        );
      })}
    </div>
  );
}
