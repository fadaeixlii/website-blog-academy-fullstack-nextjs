import { ReactNode } from "react";
import "./globals.css";
import { MainLayout } from "./_components/Layout";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Your Site Title",
  description: "Your site description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
