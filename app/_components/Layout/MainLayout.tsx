import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 p-4">Main Header</header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-blue-500 p-4">Main Footer</footer>
    </div>
  );
}
