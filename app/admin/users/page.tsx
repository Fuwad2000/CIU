"use client";

import { useEffect, useState, type FormEvent } from "react";
import { UserCog } from "lucide-react";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminRoleGate from "@/components/admin/AdminRoleGate";
import { useAdminSession } from "@/components/admin/AdminSessionContext";
import {
  ADMIN_ROLE_LABELS,
  resolveAdminRole,
  type AdminRole,
  type CreatableAdminRole,
} from "@/lib/portal/admin-roles";
import { adminFetch, formatDateTime } from "@/lib/portal/client";
import { formInputClassName } from "@/lib/formStyles";

type StaffUserRecord = {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
  isOwner: boolean;
  canManageAdmins: boolean;
  createdAt: string;
};

type UsersPayload = {
  users: StaffUserRecord[];
  viewer: {
    id?: string;
    email?: string;
    displayName?: string;
    role: AdminRole | null;
    canViewAdmins: boolean;
    canCreateAdmins: boolean;
    creatableRoles: CreatableAdminRole[];
    canManageAdminRoles: boolean;
  };
};

export default function AdminUsersPage() {
  const { profile } = useAdminSession();
  const [users, setUsers] = useState<StaffUserRecord[]>([]);
  const [viewer, setViewer] = useState<UsersPayload["viewer"] | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CreatableAdminRole>("regularadmin");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState("");

  const load = () =>
    adminFetch<UsersPayload>("/api/admin/users")
      .then((payload) => {
        setError("");
        setUsers(payload.users);
        setViewer(payload.viewer);
        setRole(payload.viewer.creatableRoles[0] ?? "regularadmin");
      })
      .catch((err: Error) => setError(err.message));

  useEffect(() => {
    if (!profile.canViewAdmins) return;
    void load();
  }, [profile.canViewAdmins]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      await adminFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          displayName,
          email,
          role: viewer?.creatableRoles.length === 1 ? viewer.creatableRoles[0] : role,
        }),
      });
      setDisplayName("");
      setEmail("");
      setRole(viewer?.creatableRoles[0] ?? "regularadmin");
      setNotice("Administrator added.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add user.");
    }
  };

  const updateUser = async (user: StaffUserRecord, body: { role?: CreatableAdminRole; isActive?: boolean }) => {
    setError("");
    setNotice("");
    setBusyId(user.id);
    try {
      await adminFetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      setNotice("Administrator updated.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update user.");
    } finally {
      setBusyId("");
    }
  };

  return (
    <AdminRoleGate allow={profile.canViewAdmins}>
    <div>
      <AdminPageHeader
        eyebrow="Staff"
        title="Administrators"
        description="Intermediate admins can add regular admins. Super admins can also promote, demote, and deactivate regular or intermediate admins."
      />

      {error ? <p className="mb-6 text-sm text-danger">{error}</p> : null}
      {notice ? <p className="mb-6 text-sm text-brand">{notice}</p> : null}

      {viewer?.canCreateAdmins ? (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-border/80 bg-surface p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium xl:text-base">Full name</span>
              <input
                required
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className={formInputClassName}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium xl:text-base">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={formInputClassName}
              />
            </label>
            {viewer.creatableRoles.length > 1 ? (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium xl:text-base">Admin level</span>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value as CreatableAdminRole)}
                  className={formInputClassName}
                >
                  {viewer.creatableRoles.map((option) => (
                    <option key={option} value={option}>
                      {ADMIN_ROLE_LABELS[option]}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <p className="self-end text-sm text-muted xl:text-base">
                New accounts are created as {ADMIN_ROLE_LABELS.regularadmin}.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white xl:text-base"
          >
            Add administrator
          </button>
        </form>
      ) : null}

      {viewer || users.length > 0 ? (
      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        {users.length === 0 ? (
          <AdminEmptyState
            icon={UserCog}
            title="No administrators to show"
            description="Administrators will appear here after they are added."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm xl:text-base">
              <thead className="border-b border-border bg-background text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Added</th>
                  {viewer?.canManageAdminRoles ? <th className="px-4 py-3 font-medium">Actions</th> : null}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const userRole = resolveAdminRole(user);
                  const isSelf = user.id === viewer?.id;
                  const canManageRow =
                    Boolean(viewer?.canManageAdminRoles) && !isSelf && userRole !== "superadmin";
                  return (
                    <tr key={user.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium text-foreground">{user.displayName}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{userRole ? ADMIN_ROLE_LABELS[userRole] : user.role}</td>
                      <td className="px-4 py-3">{user.isActive ? "Active" : "Inactive"}</td>
                      <td className="px-4 py-3 text-muted">{formatDateTime(user.createdAt)}</td>
                      {viewer?.canManageAdminRoles ? (
                        <td className="px-4 py-3">
                          {canManageRow ? (
                            <div className="flex flex-wrap gap-3">
                              {userRole === "regularadmin" ? (
                                <button
                                  type="button"
                                  className="text-brand disabled:opacity-50"
                                  disabled={busyId === user.id}
                                  onClick={() => updateUser(user, { role: "intermediateadmin" })}
                                >
                                  Promote
                                </button>
                              ) : null}
                              {userRole === "intermediateadmin" ? (
                                <button
                                  type="button"
                                  className="text-brand disabled:opacity-50"
                                  disabled={busyId === user.id}
                                  onClick={() => updateUser(user, { role: "regularadmin" })}
                                >
                                  Demote
                                </button>
                              ) : null}
                              <button
                                type="button"
                                className="text-danger disabled:opacity-50"
                                disabled={busyId === user.id}
                                onClick={() => updateUser(user, { isActive: !user.isActive })}
                              >
                                {user.isActive ? "Deactivate" : "Restore"}
                              </button>
                            </div>
                          ) : (
                            <span className="text-muted">{isSelf ? "You" : "Protected"}</span>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      ) : null}
    </div>
    </AdminRoleGate>
  );
}
