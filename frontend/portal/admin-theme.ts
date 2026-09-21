export const ADMIN_THEME_KEY = "ciu-admin-theme";

export type AdminTheme = "light" | "dark";

export function resolveAdminTheme(stored: string | null): AdminTheme {
  if (stored === "light" || stored === "dark") return stored;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function applyAdminTheme(theme: AdminTheme) {
  document.documentElement.classList.toggle("admin-dark", theme === "dark");
}

export function readStoredAdminTheme(): AdminTheme {
  try {
    return resolveAdminTheme(localStorage.getItem(ADMIN_THEME_KEY));
  } catch {
    return resolveAdminTheme(null);
  }
}

export function persistAdminTheme(theme: AdminTheme) {
  try {
    localStorage.setItem(ADMIN_THEME_KEY, theme);
  } catch {
    // Ignore quota or private-mode write failures.
  }
  applyAdminTheme(theme);
}

export const adminThemeBootScript = `(function(){try{var p=location.pathname;if(p!=="/admin"&&p.indexOf("/admin/")!==0)return;document.documentElement.classList.add("admin-type");var t=localStorage.getItem("${ADMIN_THEME_KEY}");var dark=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(dark)document.documentElement.classList.add("admin-dark");}catch(e){}})();`;
