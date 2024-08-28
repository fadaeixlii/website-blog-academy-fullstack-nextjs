import { ReactNode } from "react";
import { AuthLayout } from "../_components/Layout";

export const metadata = {
  title: "Auth Page Title",
  description: "Description for auth pages",
};

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
