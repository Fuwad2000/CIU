import Image from "next/image";
import { ciuLogoSrc } from "@/content/SiteContent";

export default function AdminBrandMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex shrink-0 rounded-full bg-brand p-[2px] shadow-sm ${className}`}>
      <Image
        src={ciuLogoSrc}
        alt="CIU"
        width={size}
        height={size}
        className="rounded-full bg-white object-cover"
        style={{ width: size, height: size }}
      />
    </span>
  );
}
