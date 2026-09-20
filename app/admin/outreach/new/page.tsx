"use client";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import OutreachCampaignEditor from "@/components/admin/OutreachCampaignEditor";

export default function CreateOutreachCampaignPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Outreach"
        title="Create campaign"
        description="Choose a type, write the message, and select who should receive it. The server builds the recipient list from those audiences."
      />
      <OutreachCampaignEditor />
    </div>
  );
}
