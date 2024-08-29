import { AdminLayout } from "@/app/_components/Layout";
import { ReactNode } from "react";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard and management",
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
