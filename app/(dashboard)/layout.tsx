export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
