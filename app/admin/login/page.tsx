import { Suspense } from "react";
import AdminLoginForm from "@frontend/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
