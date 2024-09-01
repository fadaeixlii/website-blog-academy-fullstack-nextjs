import { ReactNode } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "./_components/Layout";
import { LanguageProvider } from "@/components/language-provider";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const cookieStore = cookies();
  const language = (cookieStore.get("language")?.value as "fa" | "en") || "fa"; // Default language is 'fa'
  const theme =
    (cookieStore.get("theme")?.value as "dark" | "light") || "light";

  console.log(language, theme);

  return (
    <html
      lang={language ?? "fa"}
      dir={language ? (language === "fa" ? "rtl" : "ltr") : "rtl"}
      className={theme === "light" ? "light" : "dark"}
    >
      <body>
        <LanguageProvider defaultLanguage={language}>
          <ThemeProvider defaultTheme={theme}>
            <MainLayout>{children}</MainLayout>;
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
