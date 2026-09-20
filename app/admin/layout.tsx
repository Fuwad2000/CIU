import type { Metadata } from "next";
import AdminAuthProvider from "@/components/admin/AdminAuthProvider";
import { adminThemeBootScript } from "@/lib/portal/admin-theme";

export const metadata: Metadata = {
  title: "Admin | CIU",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: adminThemeBootScript }} />
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </>
  );
}
