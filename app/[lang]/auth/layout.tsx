import { AuthLayout } from "@/app/_components/Layout";
import { ReactNode } from "react";

export const metadata = {
  title: "Auth Page Title",
  description: "Description for auth pages",
};

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
