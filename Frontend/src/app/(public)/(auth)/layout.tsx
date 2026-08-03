export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/server-auth";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  if (await isAuthenticated()) {
    redirect("/home");
  }

  return <>{children}</>;
}
