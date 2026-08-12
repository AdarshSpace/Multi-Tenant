"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// VideoSDK touches browser globals (`self`) at import time — never SSR it.
const LiveClassClient = dynamic(() => import("./LiveClassClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#0039a6]" />
    </div>
  ),
});

export default function LiveClassPage() {
  return <LiveClassClient />;
}
