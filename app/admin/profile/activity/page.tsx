import { redirect } from "next/navigation";

export default function AdminProfileActivityRedirect() {
  redirect("/admin/profile/history");
}
