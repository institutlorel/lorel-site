export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-screen-xl mx-auto px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
