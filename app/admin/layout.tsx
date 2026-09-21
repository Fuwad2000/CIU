import type { Metadata } from "next";
import AdminAuthProvider from "@frontend/components/admin/AdminAuthProvider";

export const metadata: Metadata = {
  title: "Admin | CIU",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
