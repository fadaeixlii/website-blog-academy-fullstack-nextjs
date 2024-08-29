import { ReactNode } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "../_components/Layout";
export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "fa" }
  ];
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  console.log("first");
  return (
    <html lang={params.lang}>
      <body>
        <ThemeProvider defaultTheme="system">
          <MainLayout>{children}</MainLayout>;
        </ThemeProvider>
      </body>
    </html>
  );
}
