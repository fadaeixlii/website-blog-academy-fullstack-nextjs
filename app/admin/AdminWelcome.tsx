"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface IAdminWelcomeProps {}

export function AdminWelcome(props: IAdminWelcomeProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (session?.user?.role !== "admin") {
      router.push("/"); // Redirect non-admins
    }
  }, [session, status]);

  if (status === "loading") return <p>Loading...</p>;

  return <h1>Admin Page - Welcome {session?.user?.name}</h1>;
}
