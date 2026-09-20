"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function AdminRoleGate({
  allow,
  redirectTo = "/admin",
  children,
}: {
  allow: boolean;
  redirectTo?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!allow) router.replace(redirectTo);
  }, [allow, redirectTo, router]);

  if (!allow) return null;
  return <>{children}</>;
}
