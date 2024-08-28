import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">Admin Header</header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4">Admin Footer</footer>
    </div>
  );
}
