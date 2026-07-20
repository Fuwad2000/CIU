export default function SectionContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10 xl:px-12 ${className}`}>
      {children}
    </div>
  );
}
