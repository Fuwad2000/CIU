import { adminPassword } from "@backend/env";

export const ADMIN_COOKIE = "ciu_admin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function encoder() {
  return new TextEncoder();
}

async function hmac(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder().encode(value));
  return toHex(signature);
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function verifyAdminPassword(password: string) {
  const expected = adminPassword();
  if (!expected) return false;
  return safeEqual(password, expected);
}

export async function createAdminSession() {
  const secret = adminPassword();
  const expiresAt = String(Date.now() + SESSION_MS);
  const signature = await hmac(expiresAt, secret);
  return `${expiresAt}.${signature}`;
}

export async function isAdminSessionValid(token: string | undefined) {
  if (!token) return false;
  const secret = adminPassword();
  if (!secret) return false;
  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;
  const expected = await hmac(expiresAt, secret);
  return safeEqual(signature, expected);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}
