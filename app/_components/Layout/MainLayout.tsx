"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SessionProvider } from "next-auth/react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  return (
    <SessionProvider>
      {pathname.includes("admin") || pathname.includes("auth") ? (
        children
      ) : (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container">{children}</main>
          <Footer />
        </div>
      )}
    </SessionProvider>
  );
}
