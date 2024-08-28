import { ReactNode } from "react";
import { AdminLayout } from "../_components/Layout";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard and management",
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
