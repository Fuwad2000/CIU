"use client";

import { acquireAdminAccessToken } from "@frontend/portal/entra-msal";
import { notifyAdminSessionExpired } from "@frontend/portal/admin-session-timeout";

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

export async function adminFetch<T>(
  path: string,
  init?: RequestInit & { expireOnUnauthorized?: boolean }
): Promise<T> {
  const { expireOnUnauthorized: expireFlag, ...requestInit } = init ?? {};
  const expireOnUnauthorized = expireFlag !== false;
  const token = await acquireAdminAccessToken();
  if (!token) {
    throw new AdminApiError("Authentication required.", 401);
  }

  const headers = new Headers(requestInit.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Content-Type") && requestInit.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, {
    ...requestInit,
    headers,
  });
  const payload = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    if (response.status === 401 && expireOnUnauthorized) notifyAdminSessionExpired();
    throw new AdminApiError(payload.error || "Request failed", response.status);
  }
  return payload;
}

export function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatShortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
