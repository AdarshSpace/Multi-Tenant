"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeHandoffCode } from "@/lib/auth";
import { Loader2 } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      setError("Missing OAuth code");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await exchangeHandoffCode(code);
        if (cancelled) return;
        const redirectTo = sessionStorage.getItem("oauth_redirect") || "/courses";
        sessionStorage.removeItem("oauth_redirect");
        router.replace(redirectTo);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "OAuth login failed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="text-center space-y-3">
        {error ? (
          <>
            <p className="text-red-500 font-medium">{error}</p>
            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="text-[#0039a6] hover:underline text-sm"
            >
              Back to login
            </button>
          </>
        ) : (
          <>
            <Loader2 className="w-8 h-8 animate-spin text-[#0039a6] mx-auto" />
            <p className="text-slate-600 text-sm">Completing sign in…</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0039a6]" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
