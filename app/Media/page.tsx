import Link from "next/link";

export default function MediaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-foreground">Media</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Explore photos and lectures from the Canadian Islamic Union community.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/Media/images"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:text-base"
        >
          CIU Images
        </Link>
        <Link
          href="/Media/lectures"
          className="inline-flex items-center justify-center rounded-xl border border-brand/20 bg-brand/5 px-6 py-3 text-sm font-semibold text-brand transition hover:border-brand/35 hover:bg-brand/10 sm:text-base"
        >
          CIU Lectures
        </Link>
      </div>
    </div>
  );
}
