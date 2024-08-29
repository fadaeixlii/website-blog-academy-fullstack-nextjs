"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminWelcome } from "./AdminWelcome";

export default function AdminPage() {
  return (
    <SessionProvider>
      <AdminWelcome />
    </SessionProvider>
  );
}
