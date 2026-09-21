"use client";

import AdminPageHeader from "@frontend/components/admin/AdminPageHeader";
import AdminRoleGate from "@frontend/components/admin/AdminRoleGate";
import OutreachCampaignEditor from "@frontend/components/admin/OutreachCampaignEditor";
import { useAdminSession } from "@frontend/components/admin/AdminSessionContext";

export default function CreateOutreachCampaignPage() {
  const { profile } = useAdminSession();

  return (
    <AdminRoleGate allow={profile.canSendOutreach} redirectTo="/admin/outreach">
      <div>
        <AdminPageHeader
          eyebrow="Outreach"
          title="Create campaign"
          description="Choose a type, write the message, and select who should receive it. The server builds the recipient list from those audiences."
        />
        <OutreachCampaignEditor />
      </div>
    </AdminRoleGate>
  );
}
