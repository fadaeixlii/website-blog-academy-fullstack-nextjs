import { ReactNode } from "react";
import "./globals.css";
import { MainLayout } from "./_components/Layout";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata = {
  title: "Your Site Title",
  description: "Your site description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system">
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
