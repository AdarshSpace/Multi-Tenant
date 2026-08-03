export const dynamic = "force-dynamic";
import LandingPage from "@/components/LandingPage/LandingPage";
import { isAuthenticated } from "@/lib/server-auth";

export default async function Page() {
  const authenticated = await isAuthenticated();
  return <LandingPage authenticated={authenticated} />;
}
